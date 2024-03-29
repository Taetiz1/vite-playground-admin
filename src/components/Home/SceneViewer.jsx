import { useRef, useEffect, useState, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { useThree } from "@react-three/fiber";

const SceneViewer = ({modelUrl}) => {
    const {scene} = useGLTF(modelUrl)

    const controlsRef = useRef();
    const modelRef = useRef();
    let cameraTarget = new Vector3()
    const camera = useThree(state => state.camera);

    useEffect(() => {
        const model = modelRef.current;

        camera.position.x = model.position.x;
        camera.position.y = model.position.y + 50;
        camera.position.z = model.position.z + 50;

        cameraTarget.x = model.position.x;
        cameraTarget.y = model.position.y + 0.6;
        cameraTarget.z = model.position.z;
        if(controlsRef.current){ controlsRef.current.target = cameraTarget; }
    }, [])

    return(
        <group>
            
            <Suspense>
                <primitive object={scene} ref={modelRef} />
            </Suspense>

            <OrbitControls 
                ref={controlsRef}
                enableZoom={true} 
                enableDamping={true} 
                enablePan={true} 
                enableRotate={true}
                minDistance={0}
                maxDistance={Infinity}
            />
        </group>
    )
}

export default SceneViewer