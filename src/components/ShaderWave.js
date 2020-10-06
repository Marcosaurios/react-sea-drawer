import {shaderMaterial} from 'drei'
import { extend } from "react-three-fiber";

const ShaderWave = shaderMaterial(
    {
        u_time: 0,
        u_resolution: [1.0, 1.0],
        u_mouse: [0.0, 0.0]
    },
    // vertex shader
    `
    // varying vec2 vUv;
    void main(){
        //v Uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // fragment shader
    `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    // varying vec2 vUv;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
        vec2 newmouse = vec2(0.0);
        newmouse = vec2( u_mouse.x/u_resolution.x, u_mouse.y/u_resolution.y);
     
        vec3 color = vec3(0.0);
        color = vec3(st.x*newmouse.x, st.y*newmouse.y,abs(sin(u_time)*0.2));
    
        gl_FragColor = vec4(color,1.0);
    }
    
    `
)

extend({ ShaderWave })