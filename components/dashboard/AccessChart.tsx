"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", accesses: 45 },
  { name: "Tue", accesses: 52 },
  { name: "Wed", accesses: 38 },
  { name: "Thu", accesses: 61 },
  { name: "Fri", accesses: 55 },
  { name: "Sat", accesses: 23 },
  { name: "Sun", accesses: 18 },
]

export default function AccessChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Access Overview</CardTitle>
        <CardDescription>Number of access attempts this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="accesses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
