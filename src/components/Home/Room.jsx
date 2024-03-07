import { useGLTF } from '@react-three/drei';
import { useSocketClient } from '../SocketClient';
import EnterBT from './EnterBT';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SpawnPoint from './SpawnPoint';
import { useRef, useEffect, useState } from "react";
import { Vector3 } from 'three';

const Room = () => {
  const { 
    SceneSelected,
  } = useSocketClient();

  const { scene } = useGLTF(SceneSelected.url)
  const modelRef = useRef();
  const controlsRef = useRef();
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
  }, [SceneSelected])

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
      <primitive object={scene} ref={modelRef} />

      {SceneSelected.spawnPos.length > 0 && SceneSelected.spawnPos.map((pos, index) => (
        <SpawnPoint key={index} index={index} />
      ))}

      {SceneSelected.enterBT.length > 0 && SceneSelected.enterBT.map((bt, index) => (
        <EnterBT key={index} index={index} />
      ))}
      
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

export default Room