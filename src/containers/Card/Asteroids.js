import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useRender } from 'react-three-fiber';
import { colorLuminance } from '_utils';

const Asteroids = (props) => {
  let group = useRef();
  let theta = 0;
  const r = 5; // cordinate radius
  const d = r * 2;

  useRender(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    const s = Math.cos(THREE.Math.degToRad(theta / 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });

  const [ geo, mat, vertices, coords ] = useMemo(() => {
    let color = '#111111';
    color = colorLuminance(color, 2 + Math.random() * 10);

    const geo = new THREE.DodecahedronGeometry(0.01 + Math.random() * 2, 1);
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      metalness: 1
    });
    mat.flatShading = true;

    const coords = new Array(200).fill().map(i => ({
      x: Math.random() * d - r,
      y: Math.random() * d - r,
      z: Math.random() * d - r
    }));

     return [geo, mat, vertices, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(({x, y, z}, i) => (
        <mesh 
          key={i} 
          receiveShadow
          castShadow
          geometry={geo} 
          material={mat} 
          position={[x, y, z]} 
          renderOrder={2} 
        />
      ))}
    </group>
  )
};

export default Asteroids;