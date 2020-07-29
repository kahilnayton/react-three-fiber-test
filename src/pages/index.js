import React, { useState, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, extend, useRender, useThree } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"

const Box = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "grey" : "hotpink",
  })

  extend({ OrbitControls })

  const Controls = () => {
    const orbitRef = useRef()
    const { camera, gl } = useThree()

    useRender(() => {
      orbitRef.current.update()
    })

    return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />
  }

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default () => {
  return (
    <>
      <Canvas>
        {/* <Controls /> */}
        <Box />
      </Canvas>
    </>
  )
}
