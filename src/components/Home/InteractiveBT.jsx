import Body_character from "./Body_character"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import { useSocketClient } from "../SocketClient"

const InteractiveBT = ({index}) => {
    const {
        SceneSelected,
        setIndexItem,
        setInputPage
    } = useSocketClient();

    const Interactive = SceneSelected.interactive[index]

    const [animation, setAnimation] = useState('')
    const [pos, setPos] = useState([])
    const [rot, setRot] = useState([])

    useFrame(() => {
        setAnimation(Interactive.emote)
        setPos(Interactive.pos)
        setRot(Interactive.rot)
    });

    const handleDBlClick = () => {
        setIndexItem(index)
        setInputPage("interactive")
    }

    return(
        <group 
            rotation={[rot[0], rot[1]-9.4, rot[2]]} 
            position={[pos[0], pos[1]-0.5, pos[2]]} 
            onDoubleClick={handleDBlClick} 
        >
            <Body_character  avatarUrl={'https://models.readyplayer.me/655a5d4e9b792809cdac419d.glb'} animation={animation} scale={[0.56, 0.56, 0.56]} />
            <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.2, 30]} />
                <meshPhysicalMaterial color="white" transparent opacity={1} />
            </mesh>
        </group>
    )
}

export default InteractiveBT