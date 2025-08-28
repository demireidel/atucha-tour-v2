"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Vector3, MathUtils } from "three"
import { ReactorBuilding } from "./models/reactor-building"
import { TurbineHall } from "./models/turbine-hall"
import { AuxiliaryBlocks } from "./models/auxiliary-blocks"
import { Switchyard } from "./models/switchyard"
import { WaterAndTerrain } from "./models/water-terrain"
import { TOURS, getTourAtProgress } from "@/lib/tours"

interface AtuchaSceneProps {
  tourId?: string | null
  onProgressUpdate?: (progress: number) => void
}

export default function AtuchaScene({ tourId, onProgressUpdate }: AtuchaSceneProps) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [tourProgress, setTourProgress] = useState(0)
  const [isInTour, setIsInTour] = useState(false)
  const tourStartTimeRef = useRef(0)
  const targetPosition = useRef(new Vector3())
  const targetLookAt = useRef(new Vector3())

  const updateProgress = useCallback(
    (progress: number) => {
      setTourProgress(progress)
      onProgressUpdate?.(progress * 100)
    },
    [onProgressUpdate],
  )

  useEffect(() => {
    if (tourId) {
      setIsInTour(true)
      tourStartTimeRef.current = Date.now()
      updateProgress(0)

      // Disable orbit controls during tour
      if (controlsRef.current) {
        controlsRef.current.enabled = false
      }
    } else {
      setIsInTour(false)

      // Re-enable orbit controls when not in tour
      if (controlsRef.current) {
        controlsRef.current.enabled = true
      }
    }
  }, [tourId, updateProgress])

  useFrame((state, delta) => {
    // Handle tour animation
    if (isInTour && tourId) {
      const currentTour = TOURS.find((t) => t.id === tourId)
      if (currentTour) {
        const elapsed = (Date.now() - tourStartTimeRef.current) / 1000
        const progress = MathUtils.clamp(elapsed / currentTour.totalDuration, 0, 1)

        updateProgress(progress)

        const tourState = getTourAtProgress(currentTour, progress)

        // Smooth camera movement
        targetPosition.current.copy(tourState.position)
        targetLookAt.current.copy(tourState.target)

        camera.position.lerp(targetPosition.current, delta * 2)

        // Update camera look-at
        const currentLookAt = new Vector3()
        camera.getWorldDirection(currentLookAt)
        currentLookAt.multiplyScalar(-1).add(camera.position)
        currentLookAt.lerp(targetLookAt.current, delta * 2)
        camera.lookAt(currentLookAt)

        camera.updateMatrixWorld()
      }
    }
  })

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[100, 100, 50]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <directionalLight position={[-50, 50, -50]} intensity={0.3} color="#10b981" />

      {/* Environment */}
      <Environment preset="city" background={false} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#f1f5f9", 100, 300]} />

      {/* Controls - disabled during tours */}
      {!tourId && (
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={200}
          maxPolarAngle={Math.PI / 2}
        />
      )}

      {/* 3D Models */}
      <WaterAndTerrain />
      <ReactorBuilding />
      <TurbineHall />
      <AuxiliaryBlocks />
      <Switchyard />

      {/* Enhanced Contact Shadows */}
      <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={200} blur={2} far={50} />
    </>
  )
}
