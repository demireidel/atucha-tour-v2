"use client"

import { useRef } from "react"
import type { Mesh } from "three"

export function ReactorBuilding() {
  const meshRef = useRef<Mesh>(null)

  return (
    <group position={[0, 0, 0]}>
      {/* Main cylindrical containment */}
      <mesh ref={meshRef} position={[0, 15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[12, 12, 30, 32]} />
        <meshStandardMaterial color="#8B8680" roughness={0.9} metalness={0} />
      </mesh>

      {/* Hemispherical dome */}
      <mesh position={[0, 30, 0]} castShadow>
        <sphereGeometry args={[12, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B8680" roughness={0.9} metalness={0} />
      </mesh>

      {/* Reactor pressure vessel (internal) */}
      <mesh position={[0, 12, 0]} castShadow>
        <cylinderGeometry args={[8, 8, 20, 32]} />
        <meshStandardMaterial color="#C0C8D0" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Steam generators */}
      {[-18, 18].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 10, 0]} castShadow>
            <cylinderGeometry args={[3, 3, 20, 16]} />
            <meshStandardMaterial color="#B0B8C1" roughness={0.3} metalness={0.9} />
          </mesh>

          {/* Steam pipes */}
          <mesh position={[0, 20, 0]} castShadow>
            <cylinderGeometry args={[1, 1, 8, 16]} />
            <meshStandardMaterial color="#B87333" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Control building */}
      <mesh position={[25, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 12, 8]} />
        <meshStandardMaterial color="#2E5984" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Control room windows */}
      <mesh position={[19, 8, 0]} castShadow>
        <boxGeometry args={[0.2, 6, 6]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0}
          transmission={0.9}
          thickness={0.1}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}
