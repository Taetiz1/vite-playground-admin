import { useState, useRef } from "react";
import { useSocketClient } from "../SocketClient";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const InformationBT = ({index}) => {
    const {
        SceneSelected,
        setIndexItem,
        setInputPage
    } = useSocketClient();

    const Information = SceneSelected.information[index]
    const buttonRef = useRef()
    const [pos, setPos] = useState([])

    useFrame(({ camera }) => {
        setPos(Information.pos)
        if(buttonRef.current) {
            buttonRef.current.lookAt(camera.position);
        }
    })

    const handleDBlClick = () => {
        setIndexItem(index)
        setInputPage("information")
    }

    return (
        <group 
            position={pos} 
            onDoubleClick={handleDBlClick}
        >
            <group 
                ref={buttonRef} 
                scale={[0.4, 0.4, 0.4]} 
            >
                <mesh>
                    <sphereGeometry args={[0.2, 30]} />
                    <meshPhysicalMaterial color="white" transparent opacity={1} />
                    <Text
                        position={[0, 0.2, 1]}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={0.2}
                        outlineWidth={0.02}
                        outlineColor="white"
                    >
                        information
                    </Text>
                </mesh>
            </group>

            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshBasicMaterial color="blue" wireframe />
            </mesh>
        </group>
    )
}

export default InformationBT