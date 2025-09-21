"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Clock, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Eye, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// Mock data - replace with actual API call
const mockVisitors: Visitor[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Solutions",
    purpose: "Business meeting with engineering team",
    hostEmployee: "John Smith",
    requestedDate: "2024-01-22",
    requestedTime: "14:00",
    duration: 120,
    status: "pending",
    requestedBy: "john.smith@company.com",
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob.wilson@consulting.com",
    phone: "+1 (555) 123-7890",
    company: "Wilson Consulting",
    purpose: "Security audit consultation",
    hostEmployee: "Sarah Johnson",
    requestedDate: "2024-01-21",
    requestedTime: "09:00",
    duration: 240,
    status: "approved",
    requestedBy: "sarah.johnson@company.com",
    approvedBy: "admin@company.com",
    qrCode: "QR123456",
    createdAt: "2024-01-19T15:45:00Z",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@vendor.com",
    phone: "+1 (555) 456-1234",
    company: "Equipment Vendor Inc",
    purpose: "Equipment maintenance",
    hostEmployee: "Mike Wilson",
    requestedDate: "2024-01-20",
    requestedTime: "13:30",
    duration: 90,
    status: "checked-in",
    requestedBy: "mike.wilson@company.com",
    approvedBy: "admin@company.com",
    checkInTime: "2024-01-20T13:25:00Z",
    qrCode: "QR789012",
    createdAt: "2024-01-18T09:15:00Z",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@partner.com",
    phone: "+1 (555) 789-0123",
    company: "Partner Solutions",
    purpose: "Project review meeting",
    hostEmployee: "Emily Davis",
    requestedDate: "2024-01-19",
    requestedTime: "11:00",
    duration: 180,
    status: "checked-out",
    requestedBy: "emily.davis@company.com",
    approvedBy: "admin@company.com",
    checkInTime: "2024-01-19T10:55:00Z",
    checkOutTime: "2024-01-19T14:10:00Z",
    qrCode: "QR345678",
    createdAt: "2024-01-17T14:20:00Z",
  },
]

export default function VisitorsList() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const fetchVisitors = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVisitors(mockVisitors)
      setLoading(false)
    }

    fetchVisitors()
  }, [])

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.hostEmployee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || visitor.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: Visitor["status"]) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "denied":
        return <XCircle className="h-4 w-4" />
      case "checked-in":
        return <User className="h-4 w-4" />
      case "checked-out":
        return <CheckCircle className="h-4 w-4" />
      case "expired":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleApprove = async (visitorId: string) => {
    // Mock approval - replace with actual API call
    setVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === visitorId
          ? { ...visitor, status: "approved" as const, approvedBy: "admin@company.com", qrCode: `QR${Date.now()}` }
          : visitor,
      ),
    )
  }

  const handleDeny = async (visitorId: string) => {
    // Mock denial - replace with actual API call
    setVisitors((prev) =>
      prev.map((visitor) => (visitor.id === visitorId ? { ...visitor, status: "denied" as const } : visitor)),
    )
  }

  const pendingVisitors = filteredVisitors.filter((v) => v.status === "pending")
  const activeVisitors = filteredVisitors.filter((v) => ["approved", "checked-in"].includes(v.status))
  const completedVisitors = filteredVisitors.filter((v) => ["checked-out", "denied", "expired"].includes(v.status))

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-muted rounded flex-1 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-32"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const VisitorCard = ({ visitor }: { visitor: Visitor }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={visitor.name} />
              <AvatarFallback>
                {visitor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{visitor.name}</CardTitle>
              <CardDescription className="text-sm">{visitor.company}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/visitors/${visitor.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              {visitor.status === "pending" && (
                <>
                  <DropdownMenuItem onClick={() => handleApprove(visitor.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeny(visitor.id)} className="text-destructive">
                    <X className="mr-2 h-4 w-4" />
                    Deny
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Host:</span>
            <span className="font-medium">{visitor.hostEmployee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{new Date(visitor.requestedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{visitor.requestedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{visitor.duration} min</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusIcon(visitor.status)}
          <Badge variant="outline" className={getStatusColor(visitor.status)}>
            {visitor.status.replace("-", " ")}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{visitor.purpose}</p>

        {visitor.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={() => handleApprove(visitor.id)} className="flex-1">
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDeny(visitor.id)} className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Deny
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search visitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingVisitors.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {pendingVisitors.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingVisitors.map((visitor) => (
              <VisitorCard key={visitor.id} visitor={visitor} />
            ))}
          </div>
          {pendingVisitors.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No pending requests</h3>
              <p className="text-muted-foreground">All visitor requests have been processed</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVisitors.map((visitor) => (
              <VisitorCard key={visitor.id} visitor={visitor} />
            ))}
          </div>
          {activeVisitors.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No active visitors</h3>
              <p className="text-muted-foreground">No visitors are currently approved or checked in</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedVisitors.map((visitor) => (
              <VisitorCard key={visitor.id} visitor={visitor} />
            ))}
          </div>
          {completedVisitors.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No completed visits</h3>
              <p className="text-muted-foreground">No visitors have completed their visits yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
