import * as THREE from 'three';
import { AR, POS1 } from 'js-aruco';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import Webcam from 'react-webcam';
import styles from './Card.css';
import { PerspectiveCamera } from 'three';

class Card extends Component {
  state = { 
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(1, 1, 1)
  };

  constructor(props) {
    super(props);
    this.aruco = new AR.Detector();
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    const canvas = this.$webcam.getCanvas();
    if (canvas !== null) {
      const ctx = canvas.getContext('2d');
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      if (frame !== null) {
        const markers = this.aruco.detect(frame);

        markers.map((marker) => {
          marker.pose = this.getMarkerPose(marker, canvas);
        });
      }
    }

    requestAnimationFrame(this.update);
  }

  getMarkerPose(marker, canvas) {
    const { markerSize } = this.props;
    const posit = new POS1.Posit(markerSize, canvas.width);

    const { corners } = marker;
    for (var i = 0; i < corners.length; ++ i) {
      const corner = corners[i];

      corner.x = corner.x - (canvas.width / 2);
      corner.y = (canvas.height / 2) - corner.y;
    }

    const { bestTranslation, bestRotation } = posit.pose(corners);
    this.updateObject(bestRotation, bestTranslation);
    console.log(bestTranslation);
    // this.$box.matrix = pose.bestRotation;
    // this.$box.matrix.setPosition(pose.bestTranslation);
    // this.$box.position.set(pose.bestTranslation);
    // this.$box.matrixAutoUpdate = false;
    // console.log(this.$box);
  }

  webcamRef = webcam => {
    this.$webcam = webcam;
  };

  updateObject = (rotation, translation) => {
    const { markerSize } = this.props;

    const scale = new THREE.Vector3(markerSize, markerSize, markerSize);

    const objRotation = new THREE.Euler();
    objRotation.x = -Math.asin(-rotation[1][2]);
    objRotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
    objRotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

    const position = new THREE.Vector3();
    position.x = translation[0];
    position.y = translation[1];
    position.z = -translation[2];

    this.setState({
      position,
      rotation: objRotation,
      scale
    });
  }

  render() {
    const { position, rotation, scale } = this.state;
    const width = 640;
    const height = 480;

    const videoConstraints = {
      height,
      width
    };

    return (
      <div className={styles.container}>
        <Webcam 
          audio={false}
          className={styles.webcam}
          ref={this.webcamRef}
          screenshotFormat="image/png"
          // videoConstraints={videoConstraints} 
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
            />
            <mesh 
              position={position}
              rotation={rotation}
              scale={scale}
            >
              <octahedronGeometry attach="geometry" />
              <meshBasicMaterial attach="material" color="peachpuff" opacity={0.5} transparent />
            </mesh>
          </Canvas>
        </div>
      </div>
    );
  }
};

Card.defaultProps = {
  markerSize: 23 // marker size in mm
};

export default Card;