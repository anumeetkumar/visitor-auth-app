"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Users, Clock, MapPin, Edit, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccessLog from "@/components/rooms/AccessLog"

type Room = {
  id: string
  name: string
  code: string
  description: string
  capacity: number
  status: "active" | "inactive" | "maintenance"
  accessLevel: "low" | "medium" | "high"
  location: string
  lastAccessed: string
  totalAccesses: number
  createdAt: string
}

type RoomDetailsProps = {
  roomId: string
}

// Mock data - replace with actual API call
const mockRoom: Room = {
  id: "1",
  name: "Conference Room A",
  code: "CR-A-101",
  description: "Main conference room with video conferencing capabilities and whiteboard",
  capacity: 12,
  status: "active",
  accessLevel: "medium",
  location: "Building A, Floor 1",
  lastAccessed: "2 hours ago",
  totalAccesses: 45,
  createdAt: "2024-01-15",
}

export default function RoomDetails({ roomId }: RoomDetailsProps) {
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRoom(mockRoom)
      setLoading(false)
    }

    fetchRoom()
  }, [roomId])

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getAccessLevelColor = (level: Room["accessLevel"]) => {
    switch (level) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground">Room not found</h2>
        <p className="text-muted-foreground mt-2">The requested room could not be found.</p>
        <Link href="/rooms" className="mt-4 inline-block">
          <Button>Back to Rooms</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/rooms">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{room.name}</h1>
            <p className="text-muted-foreground font-mono">{room.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/rooms/${room.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="access-log">Access Log</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Room Information</CardTitle>
                  <CardDescription>Details and current status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{room.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{room.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{room.capacity} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Total Accesses:</span>
                      <span className="font-medium">{room.totalAccesses}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last Accessed:</span>
                      <span className="font-medium">{room.lastAccessed}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="outline" className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                    <Badge variant="outline" className={getAccessLevelColor(room.accessLevel)}>
                      {room.accessLevel} security
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access-log">
              <AccessLog roomId={room.id} />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Room Settings</CardTitle>
                  <CardDescription>Configure room access and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings panel coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{room.totalAccesses}</div>
                <div className="text-sm text-muted-foreground">Total Accesses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{room.capacity}</div>
                <div className="text-sm text-muted-foreground">Max Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-foreground">Active</div>
                <div className="text-sm text-muted-foreground">Current Status</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="mr-2 h-4 w-4" />
                Grant Access
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                View Authorized Users
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
