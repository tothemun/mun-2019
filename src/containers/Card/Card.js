import * as THREE from 'three';
import { AR, POS1 } from 'js-aruco';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber'
import Webcam from 'react-webcam';
import styles from './Card.css';

class Card extends Component {
  state = { markers: [] };

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

        this.setState({ markers });
      }
    }

    requestAnimationFrame(this.update);
  }

  getMarkerPose(marker, canvas) {
    const markerSize = 23;
    const posit = new POS1.Posit(markerSize, canvas.width);

    const { corners } = marker;
    for (var i = 0; i < corners.length; ++ i) {
      const corner = corners[i];

      corner.x = corner.x - (canvas.width / 2);
      corner.y = (canvas.height / 2) - corner.y;
    }

    const pose = posit.pose(corners);
    console.log(pose.bestTranslation);
    // this.$box.matrix = pose.bestRotation;
    // this.$box.matrix.setPosition(pose.bestTranslation);
    this.$box.position.set(pose.bestTranslation);
    this.$box.matrixAutoUpdate = false;
    console.log(this.$box);
  }

  webcamRef = webcam => {
    this.$webcam = webcam;
  };

  boxRef = box => {
    this.$box = box;
  }

  render() {
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
        <Canvas camera={{ 
          position: [0, 0, 1000],
          lookAt: [0, 0, 0]
        }}>
          <mesh ref={this.boxRef} castShadow receiveShadow>
            <boxGeometry attach="geometry" args={[20, 20, 20]} />
            <meshStandardMaterial attach="material" />
          </mesh>
        </Canvas>
      </div>
    );
  }
};

export default Card;