import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useRender } from 'react-three-fiber';

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
    const geo = new THREE.SphereBufferGeometry(.1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('gray') });
    const coords = new Array(200).fill().map(i => [
      Math.random() * d - r,
      Math.random() * d - r,
      Math.random() * d - r
    ]);

    // coords.reduce((prev, cur, i) => {

    // });
    
    return [geo, mat, vertices, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} renderOrder={2} />
      ))}
    </group>
  )
};

export default Asteroids;