"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, Upload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Organization = {
  id: string
  name: string
  logo?: string
  status: "active" | "inactive" | "suspended"
}

type EditOrganizationFormProps = {
  organizationId: string
}

export default function EditOrganizationForm({ organizationId }: EditOrganizationFormProps) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        // Mock data - replace with actual API call
        const mockOrganization: Organization = {
          id: organizationId,
          name: "TechCorp Solutions",
          logo: "/placeholder.svg",
          status: "active",
        }
        
        setOrganization(mockOrganization)
        setFormData({
          name: mockOrganization.name,
          logo: mockOrganization.logo || "",
        })
        setLogoPreview(mockOrganization.logo || null)
      } catch (error) {
        setError("Failed to load organization data")
      }
    }

    fetchOrganization()
  }, [organizationId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const organizationData = {
        ...formData,
        logo: logoPreview || undefined,
      }

      const response = await fetch(`/api/organizations/${organizationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizationData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to update organization")
      }

      router.push(`/organizations/${organizationId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Logo file size must be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        setFormData((prev) => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setFormData((prev) => ({ ...prev, logo: "" }))
  }

  if (!organization) {
    return (
      <div className="space-y-4">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Link href={`/organizations/${organizationId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <CardTitle>Edit Organization</CardTitle>
              <CardDescription>Update organization information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              placeholder="TechCorp Solutions"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <Label>Organization Logo</Label>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 rounded-lg">
                <AvatarImage src={logoPreview || "/placeholder.svg"} alt="Organization logo" />
                <AvatarFallback className="rounded-lg">
                  <Building2 className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                {!logoPreview ? (
                  <div>
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={isLoading}
                    />
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="w-full" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </span>
                      </Button>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      PNG, JPG or SVG. Max file size 5MB.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeLogo}
                      className="w-full"
                      disabled={isLoading}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove Logo
                    </Button>
                    <input
                      type="file"
                      id="logo-replace"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={isLoading}
                    />
                    <Label htmlFor="logo-replace" className="cursor-pointer">
                      <Button type="button" variant="ghost" className="w-full" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Replace Logo
                        </span>
                      </Button>
                    </Label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 pt-4">
        <Link href={`/organizations/${organizationId}`} className="flex-1">
          <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="flex-1" disabled={isLoading || !formData.name.trim()}>
          {isLoading ? "Updating Organization..." : "Update Organization"}
        </Button>
      </div>
    </form>
  )
}