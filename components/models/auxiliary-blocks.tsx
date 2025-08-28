"use client"

import { useMemo } from "react"

export function AuxiliaryBlocks() {
  const blocks = useMemo(() => {
    const blocks = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const distance = 35 + Math.random() * 20
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance
      const width = 8 + Math.random() * 8
      const depth = 6 + Math.random() * 6
      const height = 8 + Math.random() * 12

      blocks.push({
        position: [x, height / 2, z] as [number, number, number],
        scale: [width, height, depth] as [number, number, number],
        rotation: [0, (Math.random() * Math.PI) / 4, 0] as [number, number, number],
      })
    }
    return blocks
  }, [])

  return (
    <group>
      {blocks.map((block, index) => (
        <mesh
          key={index}
          position={block.position}
          scale={block.scale}
          rotation={block.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2E5984" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}
