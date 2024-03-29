import { useSocketClient } from "../SocketClient"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const SpawnPoint = ({index}) => {
    const {
        SceneSelected,
        setIndexItem,
        setInputPage
    } = useSocketClient();
    const ref = useRef()

    useFrame(() => {
        if(ref.current) {
            if(SceneSelected.spawnPos[index]) {
                ref.current.position.set(
                    SceneSelected.spawnPos[index][0], 
                    SceneSelected.spawnPos[index][1],  
                    SceneSelected.spawnPos[index][2] 
                );
            }
        }
    });

    const handleDBlClick = () => {
        setIndexItem(index),
        setInputPage("spawn")
    }

    return(
        <group 
            ref={ref}
            onDoubleClick={handleDBlClick}
        >
          <mesh>
            <capsuleGeometry args={[0.3, 0.7]}  />
            <meshStandardMaterial color={"red"}  />
          </mesh>
        </group>
    )

}

export default SpawnPoint