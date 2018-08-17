import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import { times } from 'lodash';

class ParticleSystem extends Component {
  componentDidMount() {
    const { geometry } = this;
    const { vertices } = this.state;

    times(1000, (n) => {
      const x = (Math.random() * 800) - 400;
      const y = (Math.random() * 800) - 400;
      const z = (Math.random() * 800) - 400;

      vertices.push(new THREE.Vector3(x, y, z));
    });

    this.setState({ geometry, vertices });
  }

  render() {
    const { vertices } = this.state;

    return (
      <points>
        <pointsMaterial color={0xffffcc}/>
        <geometry ref={el => this.geometry = el} vertices={vertices} />
      </points>
    );
  }

  state = {
    geometry: {},
    vertices: []
  };
}

export default ParticleSystem;
