import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class ParticleSystem extends Component {
  render() {
    return (
      <points>
        <pointsMaterial />
        <icosahedronGeometry
          radius={.008}
          detail={1}
        />
      </points>
    );
  }
}

export default ParticleSystem;
