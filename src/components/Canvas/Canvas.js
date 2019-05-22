import React, { Component } from 'react';

class Canvas extends Component {
  canvasRef = (canvas) => {
    this.$canvas = canvas;
  }

  getContext = (type = '2d') => {
    return this.$canvas.getContext(type);
  }

  render() {
    return (
      <canvas ref={this.canvasRef} {...this.props} />
    )
  }
}

export default Canvas;