import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import EnterIcon from '/assets/enter.png';
import { useSocketClient } from '../SocketClient';

const EnterBT = ({position, index}) => {
    const {
        setIndexItem,
        setInputPage
    } = useSocketClient();

    const texture = useLoader(TextureLoader, EnterIcon)
    const handleDBlClick = () => {
        setIndexItem(index),
        setInputPage("BT")
    }
    
    return(
        <sprite
            scale={[0.7, 0.7, 0.7]}
            position={position}
            onDoubleClick={handleDBlClick}
        >
            <spriteMaterial attach="material" map={texture} />
        </sprite>
    )

}

export default EnterBT