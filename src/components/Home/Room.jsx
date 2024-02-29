import { useGLTF } from '@react-three/drei';
import { useSocketClient } from '../SocketClient';
import EnterBT from './EnterBT';
import { useFrame } from '@react-three/fiber';

const Room = () => {
  const { 
    SceneSelected
  } = useSocketClient();

  const { scene } = useGLTF(SceneSelected.url)
 
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

      {SceneSelected.enterBT.length > 0 && SceneSelected.enterBT.map((bt, index) => (
        <EnterBT key={index} index={index} />
      ))}
    </group>
  )
}

export default Room