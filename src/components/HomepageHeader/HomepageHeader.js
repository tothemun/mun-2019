import cn from 'classnames';
import React, { Component } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import Sphere from './Sphere';
import styles from './HomepageHeader.css';
import Headline from './headline.svg';

class HomepageHeader extends Component {
  componentDidMount() {
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
  }

  onAnimate = () => {
    this.$sphere.onAnimate();
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const { display } = this.props;

    return (
      <div className={styles.header} onMouseMove={this.onMouseMove}>
        <div
          className={cn(styles.animation, {[styles.display]: display})}
          ref={ (el) => this.$animationContainer = el}
        >
          
        {/*
          <React3
            alpha={true}
            antialias={true}
            pixelRatio={window.devicePixelRatio || 1}
            mainCamera="camera"
            width={width}
            height={height}
            onAnimate={this.onAnimate}
            clearAlpha={0}
          >
            <scene>
              <perspectiveCamera
                name="camera"
                fov={75}
                aspect={width / height}
                near={0.1}
                far={1000}
                position={this.cameraPosition}
              />
              <ambientLight color={0x353535} />
              <directionalLight
                color={0xFFFFFF}
                position={new THREE.Vector3(15, 15, 15)}
                lookAt={new THREE.Vector3(0, 0, 0)}
                intensity={.5}
                />
              <Sphere ref={ (el) => this.$sphere = el}/>
            </scene>
          </React3>
        */}
          <h2>New Site Coming Soon</h2>
        </div>
      </div>
    );
  }
}

export default HomepageHeader;
