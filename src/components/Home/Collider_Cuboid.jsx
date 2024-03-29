import { useSocketClient } from "../SocketClient"
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Collider_Cuboid = ({index}) => {
    const ref = useRef()
    const {
        SceneSelected,
        setIndexItem,
        setInputPage
    } = useSocketClient();
    const cube = SceneSelected.colliders.cuboid

    useFrame(() => {
        if(ref.current) {
            if(cube[index]) {
                ref.current.position.set(
                    cube[index].pos[0], 
                    cube[index].pos[1],  
                    cube[index].pos[2] 
                );

                ref.current.rotation.set(
                    cube[index].rot[0], 
                    cube[index].rot[1],  
                    cube[index].rot[2] 
                )

                ref.current.scale.set(
                    cube[index].args[0] * 2,
                    cube[index].args[1] * 2,
                    cube[index].args[2] * 2
                )
            }
        }
    });

    const handleDBlClick = () => {
        setIndexItem(index),
        setInputPage("cube")
    }

    return (
        <group 
            ref={ref}
            onDoubleClick={handleDBlClick}
        >
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color={'hotpink'} wireframe />
            </mesh>
        </group>
    )
}

export default Collider_Cuboid