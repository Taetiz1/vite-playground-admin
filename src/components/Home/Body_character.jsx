import { useGLTF, useAnimations } from '@react-three/drei'
import { useSocketClient } from '../SocketClient'
import { useMemo, useEffect, useRef } from 'react'
import { clone as SkeletonUtils_clone } from 'three/examples/jsm/utils/SkeletonUtils'

function GetAvatarAnimation(avatarAnimation, downloadKey) {
  const actionsArray = []

  avatarAnimation.forEach((animation) => {
    const { animations } = useGLTF(`https://www.googleapis.com/drive/v3/files/${animation.url}?alt=media&key=${downloadKey}`)

    actionsArray.push(animations[0])
  })

  return actionsArray
}

const Body_character = ({avatarUrl, animation, scale}) => {

  const { 
    avatarAnimation, 
    downloadKey
  } = useSocketClient();

  const { scene } = useGLTF(avatarUrl)
  const cloneRef = useRef()
  const clone = useMemo(() => SkeletonUtils_clone(scene), [scene])

  const animations = useMemo(() => GetAvatarAnimation(avatarAnimation, downloadKey), []);
  const { actions } = useAnimations(animations, cloneRef)
  const currentAction = useRef("");

  useEffect(() => { 

    if(animation) {
      let action = animation

      if(currentAction.current !== action) {
        const nextActionToplay = actions[action];
        const current = actions[currentAction.current];
        current?.fadeOut(0.2);
        nextActionToplay?.reset().fadeIn(0.2).play();
        currentAction.current = action;
      }
    }

  }, [animation])

  scene.traverse((object) => {
    if(object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  })

  return (
    <group ref={cloneRef} >
      <primitive object={clone} scale={scale} />
    </group>
  )
}

export default Body_character