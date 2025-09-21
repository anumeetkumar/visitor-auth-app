import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const visitorData = await request.json()

    // Validate required fields
    const requiredFields = [
      "visitorName",
      "visitorEmail",
      "visitorPhone",
      "company",
      "purpose",
      "requestedDate",
      "requestedTime",
      "duration",
      "hostEmployee",
      "requestedBy",
    ]

    for (const field of requiredFields) {
      if (!visitorData[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    // Mock visitor request creation - replace with actual database insertion
    const newVisitorRequest = {
      id: Date.now().toString(),
      name: visitorData.visitorName,
      email: visitorData.visitorEmail,
      phone: visitorData.visitorPhone,
      company: visitorData.company,
      purpose: visitorData.purpose,
      hostEmployee: visitorData.hostEmployee,
      requestedDate: visitorData.requestedDate,
      requestedTime: visitorData.requestedTime,
      duration: visitorData.duration,
      status: "pending",
      requestedBy: visitorData.requestedBy,
      notes: visitorData.notes || "",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newVisitorRequest, { status: 201 })
  } catch (error) {
    console.error("Visitor request creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
