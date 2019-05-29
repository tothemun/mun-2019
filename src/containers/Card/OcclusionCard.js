import * as THREE from 'three';
import React from 'react';
import { MeshBasicMaterial } from 'three';

const OcclusionCard = (props) => {

  return (
    <mesh renderOrder={1}>
      <boxGeometry attach="geometry" args={[5, 8, .1]} />
      <meshBasicMaterial colorWrite={false} attach="material" />
    </mesh>
  );
};

export default OcclusionCard;