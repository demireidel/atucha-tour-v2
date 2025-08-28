"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw, Settings } from "lucide-react"
import { useState } from "react"

export function TourControls() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)} className="h-8 w-8 p-0">
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  )
}
