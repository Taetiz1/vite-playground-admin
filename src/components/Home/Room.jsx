import { useGLTF } from '@react-three/drei'
import { useSocketClient } from '../SocketClient';

const Room = () => {
    const { 
      SceneSelected,
    } = useSocketClient();

    const { scene } = useGLTF(SceneSelected.url)
    console.log(SceneSelected)

    return( 
    <group>
        <primitive object={scene} position={SceneSelected.pos} rotation={SceneSelected.Rot} />
    </group>
    )
}

export default Room