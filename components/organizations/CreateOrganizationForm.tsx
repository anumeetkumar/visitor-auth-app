"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, Upload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type OrganizationFormData = {
  name: string
  logo?: string
}

export default function CreateOrganizationForm() {
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
    logo: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const organizationData = {
        ...formData,
        logo: logoPreview || undefined,
      }

      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizationData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create organization")
      }

      router.push("/organizations")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof OrganizationFormData, value: string) => {
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
    setFormData((prev) => ({ ...prev, logo: undefined }))
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
            <Link href="/organizations">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Enter basic organization details</CardDescription>
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

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Organization will be created with active status</li>
              <li>• You can add organization admins and employees</li>
              <li>• Access permissions can be configured per organization</li>
              <li>• Organization data will be available in reports and analytics</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 pt-4">
        <Link href="/organizations" className="flex-1">
          <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="flex-1" disabled={isLoading || !formData.name.trim()}>
          {isLoading ? "Creating Organization..." : "Create Organization"}
        </Button>
      </div>
    </form>
  )
}