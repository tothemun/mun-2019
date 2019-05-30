import * as THREE from 'three';
import React, { useState, useRef } from 'react';
import { useRender } from 'react-three-fiber';
import { AR, POS1 } from 'js-aruco';
import Asteroids from './Asteroids';
import OcclusionCard from './OcclusionCard';

const ARGroup = ({ markerSize, webcam }) => {
  let $group = useRef();

  const [ cardDetected, setCardDetected ] = useState(false);
  const aruco = new AR.Detector();

  const getMarkerPose = (marker, canvas) => {
    const posit = new POS1.Posit(markerSize, canvas.width);
  
    const { corners } = marker;
    for (var i = 0; i < corners.length; ++ i) {
      const corner = corners[i];
  
      corner.x = corner.x - (canvas.width / 2);
      corner.y = (canvas.height / 2) - corner.y;
    }
  
    const { bestTranslation, bestRotation } = posit.pose(corners);
    updateObject(bestRotation, bestTranslation);
  }

  const updateObject = (rotation, translation) => {
    const scale = new THREE.Vector3(markerSize, markerSize, markerSize);

    const eRot = new THREE.Euler();
    eRot.x = -Math.asin(-rotation[1][2]);
    eRot.y = -Math.atan2(rotation[0][2], rotation[2][2]);
    eRot.z = Math.atan2(rotation[1][0], rotation[1][1]);
    const qRot = new THREE.Quaternion().setFromEuler(eRot);
    
    // const objRotation = new THREE.Quaternion().fromArray(rotation);
    // console.log(objRotation);
    const position = new THREE.Vector3();
    position.x = translation[0];
    position.y = translation[1];
    position.z = -translation[2];
    console.log($group);
    $group.current.position = position;
    $group.current.quaternion = qRot;
    $group.current.scale = scale;
  }

  useRender(() => {
    if (webcam === null) return null;
    const canvas = webcam.current.getCanvas();

    if (canvas !== null) {
      const ctx = canvas.getContext('2d');
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      if (frame !== null) {
        const markers = aruco.detect(frame);

        markers.map((marker) => {
          marker.pose = getMarkerPose(marker, canvas);
          setCardDetected(true);
        });
      }
    }
  });

  if (!cardDetected) return null;

  return (
    <group ref={$group}>
      <Asteroids />
      <OcclusionCard />
    </group>
  )
}

export default ARGroup;