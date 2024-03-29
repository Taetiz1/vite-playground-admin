import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import EnterIcon from '/assets/enter.png';
import { useSocketClient } from '../SocketClient';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const EnterBT = ({index}) => {
    const {
        SceneSelected,
        setIndexItem,
        setInputPage
    } = useSocketClient();

    const ref = useRef()
    const texture = useLoader(TextureLoader, EnterIcon)

    useFrame(() => {
        if(ref.current) {
            if(SceneSelected.enterBT[index]) {
                ref.current.position.set(
                    SceneSelected.enterBT[index].pos[0], 
                    SceneSelected.enterBT[index].pos[1], 
                    SceneSelected.enterBT[index].pos[2]
                );
            }
        }
    });

    const handleDBlClick = () => {
        setIndexItem(index),
        setInputPage("BT")
    }

    return(
        <group>
            <sprite
                ref={ref}
                scale={[1, 1, 1]}
                onDoubleClick={handleDBlClick}
            >
                <spriteMaterial attach="material" map={texture} />
            </sprite>
        </group>
    )

}

export default EnterBT