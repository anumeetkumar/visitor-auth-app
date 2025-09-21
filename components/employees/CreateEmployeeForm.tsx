"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Scan, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type EmployeeFormData = {
  name: string
  email: string
  role: "employee" | "guard" | "org-admin"
  department: string
  accessLevel: "low" | "medium" | "high"
  phone: string
  notes: string
}

export default function CreateEmployeeForm() {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    role: "employee",
    department: "",
    accessLevel: "low",
    phone: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rfidScanning, setRfidScanning] = useState(false)
  const [faceCapturing, setFaceCapturing] = useState(false)
  const [rfidId, setRfidId] = useState("")
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const employeeData = {
        ...formData,
        rfidId: rfidId || undefined,
        faceImage: faceImage || undefined,
      }

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create employee")
      }

      router.push("/employees")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRfidScan = async () => {
    setRfidScanning(true)
    try {
      // Mock RFID scanning - replace with actual hardware integration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const mockRfidId = `RF${Date.now().toString().slice(-6)}`
      setRfidId(mockRfidId)
    } catch (err) {
      setError("Failed to scan RFID card")
    } finally {
      setRfidScanning(false)
    }
  }

  const handleFaceCapture = async () => {
    setFaceCapturing(true)
    try {
      // Mock face capture - replace with actual camera integration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFaceImage("/diverse-faces.png")
    } catch (err) {
      setError("Failed to capture face image")
    } finally {
      setFaceCapturing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="security">Security Setup</TabsTrigger>
          <TabsTrigger value="biometric">Biometric Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Link href="/employees">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <CardTitle>Employee Information</CardTitle>
                  <CardDescription>Enter basic employee details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.smith@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="Engineering"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the employee"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Set role and access permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "employee" | "guard" | "org-admin") => handleInputChange("role", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="guard">Security Guard</SelectItem>
                      <SelectItem value="org-admin">Organization Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select
                    value={formData.accessLevel}
                    onValueChange={(value: "low" | "medium" | "high") => handleInputChange("accessLevel", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Security</SelectItem>
                      <SelectItem value="medium">Medium Security</SelectItem>
                      <SelectItem value="high">High Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Access Level Permissions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Low:</strong> Basic office areas, common rooms
                  </li>
                  <li>
                    • <strong>Medium:</strong> Department-specific areas, meeting rooms
                  </li>
                  <li>
                    • <strong>High:</strong> Restricted areas, server rooms, executive offices
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biometric">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  RFID Setup
                </CardTitle>
                <CardDescription>Scan employee's RFID card or badge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  {rfidId ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-500">✓</div>
                      <p className="text-sm text-muted-foreground">RFID Card Registered</p>
                      <p className="font-mono text-sm">{rfidId}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Scan className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Click to scan RFID card</p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleRfidScan}
                  disabled={rfidScanning || isLoading}
                >
                  {rfidScanning ? "Scanning..." : rfidId ? "Rescan RFID" : "Scan RFID Card"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Face Recognition Setup
                </CardTitle>
                <CardDescription>Capture employee's face for biometric access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  {faceImage ? (
                    <div className="space-y-2">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src={faceImage || "/placeholder.svg"} alt="Face capture" />
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">Face model created</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <User className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Click to capture face</p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleFaceCapture}
                  disabled={faceCapturing || isLoading}
                >
                  {faceCapturing ? "Capturing..." : faceImage ? "Recapture Face" : "Capture Face"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 pt-4">
        <Link href="/employees" className="flex-1">
          <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isLoading}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Creating Employee..." : "Create Employee"}
        </Button>
      </div>
    </form>
  )
}
