import * as THREE from "three"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree} from "react-three-fiber"
import img1 from "../imgs/img1.jpg"
import img2 from "../imgs/img2.jpg"
import disp from "../imgs/mix.jpg"
import "./FadeMaterial"
import "./ShaderWave"

function FadingImage() {
  const ref = useRef()
  const { size } = useThree()
  const mouse = useRef([0,0]);

  const [hovered, setHover] = useState(false)
  useFrame((state) => {
    ref.current.u_time = state.clock.getElapsedTime();
    //console.log(mouse.x, mouse.y)
    ref.current.u_mouse = mouse.current;
    //THREE.MathUtils.lerp(ref.current.time, hovered ? 1 : 0, 0.1)
    //ref.current.resolution = [ref.current.resolution[0]++, ref.current.resolution[1]++]
    //ref.current.resolution = [ res[0]++, res[1]++ ]
    //console.log(state.clock.getElapsedTime())
  })

  return (
    <mesh onPointerMove={e => (mouse.current = [e.clientX, e.clientY])} /* onPointerMove={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} */ /* scale={hovered ? [size.width, size.height, 3] : [2,2,2]} */>
      <planeBufferGeometry attach="geometry" args={[size.width, size.height]}/>
      <shaderWave attach="material" ref={ref} u_resolution={[size.width,size.height]} u_mouse={[mouse.x, mouse.y]}/>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.85} />
      <Suspense fallback={null}>
        <FadingImage />
      </Suspense>
    </Canvas>
  )
}
