import { useGLTF } from '@react-three/drei'
const Body_character = ({position, rotation, avatarUrl}) => {

  const { scene } = useGLTF(avatarUrl)

  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  })

  return (
    <group>
      <primitive object={scene} position={position} rotation={rotation} />
    </group>
  )
}

export default Body_character