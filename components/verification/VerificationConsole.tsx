"use client"

import { useState } from "react"
import { Scan, User, QrCode, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { readRFIDCard, recognizeFace } from "@/lib/hardware"

type VerificationResult = {
  type: "rfid" | "face" | "qr"
  success: boolean
  personName?: string
  personId?: string
  accessLevel?: string
  message: string
  timestamp: Date
}

export default function VerificationConsole() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanType, setScanType] = useState<"rfid" | "face" | "qr" | null>(null)
  const [results, setResults] = useState<VerificationResult[]>([])
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null)

  const handleRFIDScan = async () => {
    setIsScanning(true)
    setScanType("rfid")
    setCurrentResult(null)

    try {
      const result = await readRFIDCard(10000) // 10 second timeout

      const verificationResult: VerificationResult = {
        type: "rfid",
        success: result.success && !!result.employeeId,
        personName: result.employeeId ? `Employee ${result.employeeId}` : undefined,
        personId: result.employeeId,
        accessLevel: result.employeeId ? "Medium" : undefined,
        message: result.success
          ? result.employeeId
            ? "Access granted - Employee verified"
            : "RFID card read but no employee found"
          : result.error || "RFID scan failed",
        timestamp: new Date(),
      }

      setCurrentResult(verificationResult)
      setResults((prev) => [verificationResult, ...prev.slice(0, 9)]) // Keep last 10 results
    } catch (error) {
      const errorResult: VerificationResult = {
        type: "rfid",
        success: false,
        message: "RFID scanner error",
        timestamp: new Date(),
      }
      setCurrentResult(errorResult)
      setResults((prev) => [errorResult, ...prev.slice(0, 9)])
    } finally {
      setIsScanning(false)
      setScanType(null)
    }
  }

  const handleFaceScan = async () => {
    setIsScanning(true)
    setScanType("face")
    setCurrentResult(null)

    try {
      const result = await recognizeFace()

      const verificationResult: VerificationResult = {
        type: "face",
        success: result.success && result.match,
        personName: result.employeeId ? `Employee ${result.employeeId}` : undefined,
        personId: result.employeeId,
        accessLevel: result.employeeId ? "High" : undefined,
        message: result.success
          ? result.match
            ? `Access granted - Face recognized (${Math.round(result.confidence * 100)}% confidence)`
            : "Face detected but no match found"
          : result.error || "Face recognition failed",
        timestamp: new Date(),
      }

      setCurrentResult(verificationResult)
      setResults((prev) => [verificationResult, ...prev.slice(0, 9)])
    } catch (error) {
      const errorResult: VerificationResult = {
        type: "face",
        success: false,
        message: "Face recognition system error",
        timestamp: new Date(),
      }
      setCurrentResult(errorResult)
      setResults((prev) => [errorResult, ...prev.slice(0, 9)])
    } finally {
      setIsScanning(false)
      setScanType(null)
    }
  }

  const handleQRScan = async () => {
    setIsScanning(true)
    setScanType("qr")
    setCurrentResult(null)

    try {
      // Mock QR code scanning
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockSuccess = Math.random() > 0.2 // 80% success rate
      const verificationResult: VerificationResult = {
        type: "qr",
        success: mockSuccess,
        personName: mockSuccess ? "Visitor Alice Johnson" : undefined,
        personId: mockSuccess ? "visitor_001" : undefined,
        accessLevel: mockSuccess ? "Visitor" : undefined,
        message: mockSuccess ? "Access granted - Valid visitor QR code" : "Invalid or expired QR code",
        timestamp: new Date(),
      }

      setCurrentResult(verificationResult)
      setResults((prev) => [verificationResult, ...prev.slice(0, 9)])
    } catch (error) {
      const errorResult: VerificationResult = {
        type: "qr",
        success: false,
        message: "QR code scanner error",
        timestamp: new Date(),
      }
      setCurrentResult(errorResult)
      setResults((prev) => [errorResult, ...prev.slice(0, 9)])
    } finally {
      setIsScanning(false)
      setScanType(null)
    }
  }

  const getResultIcon = (result: VerificationResult) => {
    if (result.success) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  const getResultColor = (result: VerificationResult) => {
    if (result.success) {
      return "bg-green-500/10 text-green-500 border-green-500/20"
    }
    return "bg-red-500/10 text-red-500 border-red-500/20"
  }

  const getScanTypeIcon = (type: "rfid" | "face" | "qr") => {
    switch (type) {
      case "rfid":
        return <Scan className="h-5 w-5" />
      case "face":
        return <User className="h-5 w-5" />
      case "qr":
        return <QrCode className="h-5 w-5" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Access Verification</CardTitle>
            <CardDescription>Scan RFID cards, faces, or QR codes to verify access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={handleRFIDScan}
                disabled={isScanning}
                className="h-20 flex flex-col gap-2"
                variant={scanType === "rfid" ? "default" : "outline"}
              >
                <Scan className="h-6 w-6" />
                <span>{scanType === "rfid" && isScanning ? "Scanning RFID..." : "Scan RFID Card"}</span>
              </Button>

              <Button
                onClick={handleFaceScan}
                disabled={isScanning}
                className="h-20 flex flex-col gap-2"
                variant={scanType === "face" ? "default" : "outline"}
              >
                <User className="h-6 w-6" />
                <span>{scanType === "face" && isScanning ? "Recognizing Face..." : "Face Recognition"}</span>
              </Button>

              <Button
                onClick={handleQRScan}
                disabled={isScanning}
                className="h-20 flex flex-col gap-2"
                variant={scanType === "qr" ? "default" : "outline"}
              >
                <QrCode className="h-6 w-6" />
                <span>{scanType === "qr" && isScanning ? "Scanning QR Code..." : "Scan QR Code"}</span>
              </Button>
            </div>

            {isScanning && (
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {scanType === "rfid" && "Please present RFID card to the scanner..."}
                  {scanType === "face" && "Please look at the camera for face recognition..."}
                  {scanType === "qr" && "Please present QR code to the scanner..."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {currentResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getResultIcon(currentResult)}
                Verification Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getScanTypeIcon(currentResult.type)}
                  <Badge variant="outline" className={getResultColor(currentResult)}>
                    {currentResult.success ? "Access Granted" : "Access Denied"}
                  </Badge>
                </div>

                {currentResult.personName && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={currentResult.personName} />
                      <AvatarFallback>
                        {currentResult.personName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentResult.personName}</p>
                      <p className="text-sm text-muted-foreground">Access Level: {currentResult.accessLevel}</p>
                    </div>
                  </div>
                )}

                <p className="text-sm text-muted-foreground">{currentResult.message}</p>
                <p className="text-xs text-muted-foreground">{currentResult.timestamp.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>History of access verification attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No verification attempts yet</p>
              ) : (
                results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {getScanTypeIcon(result.type)}
                      {getResultIcon(result)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{result.personName || "Unknown"}</p>
                        <Badge variant="outline" className={getResultColor(result)}>
                          {result.success ? "Granted" : "Denied"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{result.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
