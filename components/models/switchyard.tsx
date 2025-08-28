"use client"

import { useMemo } from "react"

export function Switchyard() {
  const transformers = useMemo(() => {
    const transformers = []
    for (let i = 0; i < 8; i++) {
      const row = Math.floor(i / 4)
      const col = i % 4
      const x = (col - 1.5) * 12 - 80
      const z = (row - 0.5) * 15

      transformers.push({
        position: [x, 2, z] as [number, number, number],
        scale: [3 + Math.random(), 4 + Math.random(), 2 + Math.random() * 0.5] as [number, number, number],
      })
    }
    return transformers
  }, [])

  const pylons = useMemo(() => {
    const pylons = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const x = Math.cos(angle) * 25 - 80
      const z = Math.sin(angle) * 20

      pylons.push({
        position: [x, 8, z] as [number, number, number],
        height: 12 + Math.random() * 4,
      })
    }
    return pylons
  }, [])

  return (
    <group position={[-80, 0, 0]}>
      {/* Ground pad */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[60, 0.2, 40]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.8} metalness={0} />
      </mesh>

      {/* Transformers */}
      {transformers.map((transformer, index) => (
        <mesh key={`transformer-${index}`} position={transformer.position} scale={transformer.scale} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.2} />
        </mesh>
      ))}

      {/* Pylons */}
      {pylons.map((pylon, index) => (
        <group key={`pylon-${index}`} position={pylon.position}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.5, pylon.height, 8]} />
            <meshStandardMaterial color="#B0B8C1" roughness={0.3} metalness={0.9} />
          </mesh>

          {/* Cross arms */}
          <mesh position={[0, pylon.height * 0.8, 0]} castShadow>
            <boxGeometry args={[6, 0.3, 0.3]} />
            <meshStandardMaterial color="#B0B8C1" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
