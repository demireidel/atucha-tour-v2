"use client"

export function TurbineHall() {
  return (
    <group position={[50, 0, 0]}>
      {/* Main hall structure */}
      <mesh position={[0, 9, 0]} castShadow receiveShadow>
        <boxGeometry args={[80, 18, 25]} />
        <meshStandardMaterial color="#B0B8C1" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Turbine generators */}
      {[-25, 0, 25].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Main generator */}
          <mesh position={[0, 4, 0]} castShadow>
            <cylinderGeometry args={[3, 3, 20, 16]} />
            <meshStandardMaterial color="#C0C8D0" roughness={0.15} metalness={0.95} />
          </mesh>

          {/* Turbine shaft */}
          <mesh position={[0, 4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 18, 16]} />
            <meshStandardMaterial color="#B0B8C1" roughness={0.3} metalness={0.9} />
          </mesh>

          {/* Foundation */}
          <mesh position={[0, 1, 0]} receiveShadow>
            <boxGeometry args={[8, 2, 8]} />
            <meshStandardMaterial color="#8B8680" roughness={0.9} metalness={0} />
          </mesh>
        </group>
      ))}

      {/* Overhead crane */}
      <mesh position={[0, 16, 0]} castShadow>
        <boxGeometry args={[75, 1, 2]} />
        <meshStandardMaterial color="#2E5984" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  )
}
