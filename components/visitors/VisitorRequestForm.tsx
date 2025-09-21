"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useAuthStore from "@/store/useAuthStore"

type VisitorRequestData = {
  visitorName: string
  visitorEmail: string
  visitorPhone: string
  company: string
  purpose: string
  requestedDate: string
  requestedTime: string
  duration: number
  notes: string
}

export default function VisitorRequestForm() {
  const [formData, setFormData] = useState<VisitorRequestData>({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    company: "",
    purpose: "",
    requestedDate: "",
    requestedTime: "",
    duration: 60,
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { user } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const requestData = {
        ...formData,
        hostEmployee: user?.name || "Unknown",
        requestedBy: user?.email || "unknown@company.com",
      }

      const response = await fetch("/api/visitors/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to submit visitor request")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/visitors")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof VisitorRequestData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-4xl text-green-500">✓</div>
            <h2 className="text-2xl font-bold text-foreground">Request Submitted</h2>
            <p className="text-muted-foreground">
              Your visitor request has been submitted successfully. You will be notified once it's reviewed.
            </p>
            <Link href="/visitors">
              <Button>View All Requests</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Link href="/visitors">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <CardTitle>Visitor Information</CardTitle>
            <CardDescription>Enter details for the visitor request</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Visitor Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitorName">Visitor Name</Label>
                <Input
                  id="visitorName"
                  placeholder="John Doe"
                  value={formData.visitorName}
                  onChange={(e) => handleInputChange("visitorName", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitorEmail">Visitor Email</Label>
                <Input
                  id="visitorEmail"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={formData.visitorEmail}
                  onChange={(e) => handleInputChange("visitorEmail", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitorPhone">Phone Number</Label>
                <Input
                  id="visitorPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.visitorPhone}
                  onChange={(e) => handleInputChange("visitorPhone", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Visit Details</h3>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Textarea
                id="purpose"
                placeholder="Brief description of the visit purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestedDate">Date</Label>
                <div className="relative">
                  <Input
                    id="requestedDate"
                    type="date"
                    value={formData.requestedDate}
                    onChange={(e) => handleInputChange("requestedDate", e.target.value)}
                    required
                    disabled={isLoading}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestedTime">Time</Label>
                <div className="relative">
                  <Input
                    id="requestedTime"
                    type="time"
                    value={formData.requestedTime}
                    onChange={(e) => handleInputChange("requestedTime", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => handleInputChange("duration", Number.parseInt(value))}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">Full day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information or special requirements"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Request Summary:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Host: {user?.name || "Current User"}</li>
              <li>• Visitor will receive email notification upon approval</li>
              <li>• QR code will be generated for approved visits</li>
              <li>• Request requires admin approval</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Link href="/visitors" className="flex-1">
              <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
