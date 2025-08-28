"use client"

export function WaterAndTerrain() {
  return (
    <group>
      {/* Terrain base */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[400, 4, 400]} />
        <meshStandardMaterial color="#4A5D23" roughness={0.9} metalness={0} />
      </mesh>

      {/* Water body */}
      <mesh position={[0, -0.5, -150]} receiveShadow>
        <boxGeometry args={[200, 1, 100]} />
        <meshPhysicalMaterial
          color="#1e40af"
          roughness={0.05}
          metalness={0}
          transmission={0.95}
          thickness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Roads */}
      <mesh position={[0, -1.9, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 200]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.8} metalness={0} />
      </mesh>

      <mesh position={[0, -1.9, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 200]} />
        <meshStandardMaterial color="#2D2D2D" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  )
}
