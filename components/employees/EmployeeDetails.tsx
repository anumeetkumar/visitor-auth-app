"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, User, Shield, Clock, Mail, Phone, Building, Edit, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Employee = {
  id: string
  name: string
  email: string
  role: "employee" | "guard" | "org-admin"
  department: string
  status: "active" | "inactive" | "suspended"
  accessLevel: "low" | "medium" | "high"
  phone: string
  rfidId?: string
  faceModelId?: string
  lastAccess: string
  totalAccesses: number
  joinedAt: string
  avatar?: string
  notes?: string
}

type EmployeeDetailsProps = {
  employeeId: string
}

// Mock data - replace with actual API call
const mockEmployee: Employee = {
  id: "1",
  name: "John Smith",
  email: "john.smith@company.com",
  role: "employee",
  department: "Engineering",
  status: "active",
  accessLevel: "medium",
  phone: "+1 (555) 123-4567",
  rfidId: "RF001234",
  faceModelId: "FM001234",
  lastAccess: "2 hours ago",
  totalAccesses: 156,
  joinedAt: "2024-01-15",
  notes: "Senior software engineer with access to development environments.",
}

export default function EmployeeDetails({ employeeId }: EmployeeDetailsProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setEmployee(mockEmployee)
      setLoading(false)
    }

    fetchEmployee()
  }, [employeeId])

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

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground">Employee not found</h2>
        <p className="text-muted-foreground mt-2">The requested employee could not be found.</p>
        <Link href="/employees" className="mt-4 inline-block">
          <Button>Back to Employees</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/employees">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
              <p className="text-muted-foreground">{employee.email}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/employees/${employee.id}/edit`}>
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
              <TabsTrigger value="access-history">Access History</TabsTrigger>
              <TabsTrigger value="biometric">Biometric Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Information</CardTitle>
                  <CardDescription>Personal and professional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{employee.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Department</p>
                          <p className="font-medium">{employee.department}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Accesses</p>
                          <p className="font-medium">{employee.totalAccesses}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Last Access</p>
                          <p className="font-medium">{employee.lastAccess}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p className="font-medium">{new Date(employee.joinedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                    <Badge variant="outline" className={getRoleColor(employee.role)}>
                      {employee.role}
                    </Badge>
                    <Badge variant="outline" className={getAccessLevelColor(employee.accessLevel)}>
                      {employee.accessLevel} access
                    </Badge>
                  </div>

                  {employee.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-muted-foreground">{employee.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access-history">
              <Card>
                <CardHeader>
                  <CardTitle>Access History</CardTitle>
                  <CardDescription>Recent access attempts and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Access history coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="biometric">
              <Card>
                <CardHeader>
                  <CardTitle>Biometric Data</CardTitle>
                  <CardDescription>RFID and face recognition setup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4" />
                        <h4 className="font-medium">RFID Card</h4>
                      </div>
                      {employee.rfidId ? (
                        <div>
                          <p className="text-sm text-green-600 mb-1">✓ Registered</p>
                          <p className="font-mono text-sm">{employee.rfidId}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not registered</p>
                      )}
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4" />
                        <h4 className="font-medium">Face Recognition</h4>
                      </div>
                      {employee.faceModelId ? (
                        <div>
                          <p className="text-sm text-green-600 mb-1">✓ Registered</p>
                          <p className="font-mono text-sm">{employee.faceModelId}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not registered</p>
                      )}
                    </div>
                  </div>
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
                <div className="text-2xl font-bold text-primary">{employee.totalAccesses}</div>
                <div className="text-sm text-muted-foreground">Total Accesses</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-foreground capitalize">{employee.status}</div>
                <div className="text-sm text-muted-foreground">Current Status</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-foreground capitalize">{employee.accessLevel}</div>
                <div className="text-sm text-muted-foreground">Access Level</div>
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
                Grant Room Access
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="mr-2 h-4 w-4" />
                Update Biometrics
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
