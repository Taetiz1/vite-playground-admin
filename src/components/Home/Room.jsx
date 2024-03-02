import { useGLTF } from '@react-three/drei';
import { useSocketClient } from '../SocketClient';
import EnterBT from './EnterBT';
import { useFrame } from '@react-three/fiber';

const Room = () => {
  const { 
    SceneSelected,
    // user
  } = useSocketClient();

  const { scene } = useGLTF(SceneSelected.url)
  // const { scene: userAvatar } = useGLTF("https://models.readyplayer.me/655a5d4e9b792809cdac419d.glb")
  // userAvatar.scale.set(0.5, 0.5, 0.5)
 
  useFrame(() => {
    scene.scale.set(
      SceneSelected.scale[0], 
      SceneSelected.scale[1], 
      SceneSelected.scale[2]
    );

    scene.position.set(
      SceneSelected.pos[0],
      SceneSelected.pos[1],
      SceneSelected.pos[2],
    )

    scene.rotation.set(
      SceneSelected.rot[0],
      SceneSelected.rot[1],
      SceneSelected.rot[2],
    )
  })

  return( 
    <group>
      
      <primitive object={scene} />

      {/* <group position={SceneSelected.spawnPos}>
        <primitive object={userAvatar} />
      </group> */}

      {SceneSelected.enterBT.length > 0 && SceneSelected.enterBT.map((bt, index) => (
        <EnterBT key={index} index={index} />
      ))}
    </group>
  )
}

export default Room