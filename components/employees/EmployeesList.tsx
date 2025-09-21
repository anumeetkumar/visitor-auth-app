"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Shield, Clock, MoreHorizontal, Edit, Trash2, UserCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Employee = {
  id: string
  name: string
  email: string
  role: "employee" | "guard" | "org-admin"
  department: string
  status: "active" | "inactive" | "suspended"
  accessLevel: "low" | "medium" | "high"
  rfidId?: string
  faceModelId?: string
  lastAccess: string
  totalAccesses: number
  joinedAt: string
  avatar?: string
}

// Mock data - replace with actual API call
const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "employee",
    department: "Engineering",
    status: "active",
    accessLevel: "medium",
    rfidId: "RF001234",
    faceModelId: "FM001234",
    lastAccess: "2 hours ago",
    totalAccesses: 156,
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "org-admin",
    department: "Security",
    status: "active",
    accessLevel: "high",
    rfidId: "RF001235",
    lastAccess: "30 minutes ago",
    totalAccesses: 89,
    joinedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "guard",
    department: "Security",
    status: "active",
    accessLevel: "high",
    rfidId: "RF001236",
    faceModelId: "FM001236",
    lastAccess: "1 hour ago",
    totalAccesses: 234,
    joinedAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "employee",
    department: "Marketing",
    status: "inactive",
    accessLevel: "low",
    lastAccess: "3 days ago",
    totalAccesses: 45,
    joinedAt: "2024-01-20",
  },
]

export default function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setEmployees(mockEmployees)
      setLoading(false)
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesRole = roleFilter === "all" || employee.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "suspended":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getRoleColor = (role: Employee["role"]) => {
    switch (role) {
      case "org-admin":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "guard":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "employee":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getAccessLevelColor = (level: Employee["accessLevel"]) => {
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
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-muted rounded flex-1 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-32 animate-pulse"></div>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="guard">Guard</SelectItem>
            <SelectItem value="org-admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription className="text-sm">{employee.email}</CardDescription>
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
                      <Link href={`/employees/${employee.id}`}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/employees/${employee.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{employee.department}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
                <Badge variant="outline" className={getRoleColor(employee.role)}>
                  {employee.role}
                </Badge>
                <Badge variant="outline" className={getAccessLevelColor(employee.accessLevel)}>
                  {employee.accessLevel}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">RFID:</span>
                  <span className="font-medium">{employee.rfidId ? "✓" : "✗"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Face ID:</span>
                  <span className="font-medium">{employee.faceModelId ? "✓" : "✗"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last access {employee.lastAccess}</span>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Total accesses: </span>
                <span className="font-bold text-primary">{employee.totalAccesses}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No employees found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
