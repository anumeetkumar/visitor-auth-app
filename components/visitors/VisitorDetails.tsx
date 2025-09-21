"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Building, Clock, CheckCircle, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Visitor = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  purpose: string
  hostEmployee: string
  requestedDate: string
  requestedTime: string
  duration: number
  status: "pending" | "approved" | "denied" | "checked-in" | "checked-out" | "expired"
  requestedBy: string
  approvedBy?: string
  checkInTime?: string
  checkOutTime?: string
  qrCode?: string
  notes?: string
  createdAt: string
}

type VisitorDetailsProps = {
  visitorId: string
}

// Mock data - replace with actual API call
const mockVisitor: Visitor = {
  id: "1",
  name: "Alice Johnson",
  email: "alice.johnson@techcorp.com",
  phone: "+1 (555) 987-6543",
  company: "TechCorp Solutions",
  purpose: "Business meeting with engineering team to discuss new project requirements and timeline",
  hostEmployee: "John Smith",
  requestedDate: "2024-01-22",
  requestedTime: "14:00",
  duration: 120,
  status: "approved",
  requestedBy: "john.smith@company.com",
  approvedBy: "admin@company.com",
  qrCode: "QR123456789",
  notes: "Visitor will need access to conference room A and parking space",
  createdAt: "2024-01-20T10:30:00Z",
}

export default function VisitorDetails({ visitorId }: VisitorDetailsProps) {
  const [visitor, setVisitor] = useState<Visitor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitor = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVisitor(mockVisitor)
      setLoading(false)
    }

    fetchVisitor()
  }, [visitorId])

  const getStatusColor = (status: Visitor["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "denied":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "checked-in":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "checked-out":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "expired":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const handleCheckIn = async () => {
    if (!visitor) return
    // Mock check-in - replace with actual API call
    setVisitor({ ...visitor, status: "checked-in", checkInTime: new Date().toISOString() })
  }

  const handleCheckOut = async () => {
    if (!visitor) return
    // Mock check-out - replace with actual API call
    setVisitor({ ...visitor, status: "checked-out", checkOutTime: new Date().toISOString() })
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

  if (!visitor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground">Visitor not found</h2>
        <p className="text-muted-foreground mt-2">The requested visitor could not be found.</p>
        <Link href="/visitors" className="mt-4 inline-block">
          <Button>Back to Visitors</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/visitors">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={visitor.name} />
              <AvatarFallback className="text-lg">
                {visitor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{visitor.name}</h1>
              <p className="text-muted-foreground">{visitor.company}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {visitor.status === "approved" && (
            <Button onClick={handleCheckIn}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Check In
            </Button>
          )}
          {visitor.status === "checked-in" && (
            <Button onClick={handleCheckOut} variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Information</CardTitle>
              <CardDescription>Details and visit information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{visitor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{visitor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{visitor.company}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Host Employee</p>
                      <p className="font-medium">{visitor.hostEmployee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visit Date & Time</p>
                      <p className="font-medium">
                        {new Date(visitor.requestedDate).toLocaleDateString()} at {visitor.requestedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{visitor.duration} minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(visitor.status)}>
                  {visitor.status.replace("-", " ")}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Purpose of Visit</h4>
                <p className="text-muted-foreground">{visitor.purpose}</p>
              </div>

              {visitor.notes && (
                <div>
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-muted-foreground">{visitor.notes}</p>
                </div>
              )}

              {visitor.checkInTime && (
                <div>
                  <h4 className="font-medium mb-2">Check-in Time</h4>
                  <p className="text-muted-foreground">{new Date(visitor.checkInTime).toLocaleString()}</p>
                </div>
              )}

              {visitor.checkOutTime && (
                <div>
                  <h4 className="font-medium mb-2">Check-out Time</h4>
                  <p className="text-muted-foreground">{new Date(visitor.checkOutTime).toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visit Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-medium text-foreground capitalize">{visitor.status.replace("-", " ")}</div>
                <div className="text-sm text-muted-foreground">Current Status</div>
              </div>
              {visitor.requestedBy && (
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">Requested by</div>
                  <div className="text-sm text-muted-foreground">{visitor.requestedBy}</div>
                </div>
              )}
              {visitor.approvedBy && (
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">Approved by</div>
                  <div className="text-sm text-muted-foreground">{visitor.approvedBy}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {visitor.qrCode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Access QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Code: {visitor.qrCode}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {visitor.status === "approved" && (
                <Button onClick={handleCheckIn} className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check In Visitor
                </Button>
              )}
              {visitor.status === "checked-in" && (
                <Button onClick={handleCheckOut} variant="outline" className="w-full bg-transparent">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check Out Visitor
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
