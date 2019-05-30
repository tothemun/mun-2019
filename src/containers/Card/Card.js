import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import Webcam from 'react-webcam';
import ARGroup from './ARGroup';
import styles from './Card.css';

const Card = ({ markerSize }) => {
  let $webcam = useRef();
  const width = 640;
  const height = 480;

  return (
    <div className={styles.container}>
      <Webcam 
        audio={false}
        className={styles.$webcam}
        ref={$webcam}
        screenshotFormat="image/png"
      />
      <div className={styles.canvas}>
        <Canvas 
          height={height} 
          width={width}
        >
          <perspectiveCamera
            fov={40}
            aspect={width / height}
            near={1}
            far={10000}
            onUpdate={self => self.updateProjectionMatrix()}
            position={new THREE.Vector3(0, -1000, 0)}
          />
          <pointLight 
            intensity={6}
            distance={1000}
            color={'0xff7f24'}
            position={[250, 0, 750]} 
            castShadow
          />
          <pointLight
            intensity={6}
            distance={1000}
            color={'0x6495ed'}
            position={[-25, -10, 0]} 
            castShadow
          />
          <ARGroup markerSize={markerSize} webcam={$webcam} />
        </Canvas>
      </div>
    </div>
  );
};

Card.defaultProps = {
  markerSize: 23 // marker size in mm
};

export default Card;