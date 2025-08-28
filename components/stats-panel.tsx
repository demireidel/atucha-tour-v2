import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Award, Globe } from "lucide-react"

export function StatsPanel() {
  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      value: "12,000+",
      label: "Engineers Trained",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      value: "50,000+",
      label: "Hours of Tours",
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: "4.9/5",
      label: "Average Rating",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      value: "45+",
      label: "Countries",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center space-y-2">
            <div className="flex justify-center text-primary">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
