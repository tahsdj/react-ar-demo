
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Box, Sphere, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar'
import Marker from './components/Marker.js'
import AFrameRenderer from './components/AFrameRenderer.js'
import { Entity } from "aframe-react"
import Hammer from 'hammerjs'

class App extends Component {
  constructor() {
    super()
    this.state = {
      startX: 0,
      startZ: 0,
      startY: 0,
      objX: 0,
      objY: 0,
      objZ: 0,
      startScale: 0.4,
      scale: 0.7
    }
  }
  componentDidMount() {
    const app = document.querySelector('a-scene')
    this.hammer = new Hammer(app)
    this.hammer.get('pinch').set({ enable: true });
    this.hammer.get('rotate').set({ enable: true });
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    this.hammer.on('panstart', this.handlePan);

    this.hammer.on('panmove', this.handlePan);

    this.hammer.on('pinchstart', this.handlePinch);

    this.hammer.on('pinch', this.handlePinch);

    this.hammer.on('rotatestart', this.handleRotate);

    this.hammer.on('rotatemove', this.handleRotate);
  }
  handlePan = e => {
    const { objX, objY, objZ, startX, startY, startZ } = this.state
    if ( e.type === 'panstart') {
      // console.log('start')
      this.setState({
        startX: objX,
        startY: objY,
        startZ: objZ
      })
    }
    this.setState({
      objX: this.state.startX + e.deltaX/150,
      // objZ: startZ + e.deltaZ/200,
      objY: this.state.startY + e.deltaY/150,
    })
    // console.log('handlepan: ', e.deltaX)
  }
  handlePinch = e => {
    const {scale} = this.state
    if ( e.type === 'pinchstart' ) {
      this.setState({
        startScale: scale
      })
    }
    this.setState({
      scale: this.state.startScale*e.scale
    })
    // console.log('handlepinch')
  }
  handleRotate = () => {
    // console.log('handleRotate')
  }
  render() {
    const { objX, objY, objZ, startX, startY, startZ, scale } = this.state
    return (
      <div 
        className="App"
        id="app"
      >
        <AFrameRenderer 
          inherent={true}
          // arToolKit={{
          //   width: 100,
          //   height: 100
          // }}
          >
          <Marker parameters={{ preset: 'hiro' }}>
            <a-box 
              color='pink' 
              material='opacity: 1;' 
              position={`${objX} ${objZ} ${objY}`} 
              scale={`${scale} ${scale} ${scale}`}>
              {/* <a-animation attribute="rotation" to="360 0 0" dur="5000" easing="linear" repeat="indefinite" /> */}
            </a-box>
            <a-text
                className="text-info"
                position={`${objX} ${objZ+0.5} ${objY}`} 
                text="value: Hello World; font-size: 50px; color: black; text-align: center" wrap-count="100"></a-text>
            {/* <a-cylinder position={`${objX} ${objZ} ${objY}`} color="crimson" height="1" radius="0.15"></a-cylinder> */}
          </Marker>
            
        </AFrameRenderer>
        
      </div>
    );
  }
}

export default App;
