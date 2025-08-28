import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/20 animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">Loading 3D Experience</p>
        <p className="text-sm text-muted-foreground">Preparing your virtual tour...</p>
      </div>
    </div>
  )
}
