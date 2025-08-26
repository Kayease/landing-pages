import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartCardProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children?: ReactNode
  height?: number
}

export function ChartCard({ title, subtitle, action, children, height = 300 }: ChartCardProps) {
  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border/60">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">{title}</CardTitle>
          {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>
        <div
          className="rounded-lg border-2 border-dashed border-border/60 bg-muted/30 flex items-center justify-center"
          style={{ height }}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  )
}


