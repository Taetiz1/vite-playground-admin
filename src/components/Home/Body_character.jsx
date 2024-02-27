import { useGLTF } from '@react-three/drei'
import { useSocketClient } from '../SocketClient';
const Body_character = ({
  ...props
}) => {

  const { 
    avatarUrl,
  } = useSocketClient();

  const { scene } = useGLTF(avatarUrl)

  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  })

  return (
    <group>
      <primitive object={scene} position={props.position} rotation={props.rotation} />
    </group>
  )
}

export default Body_character