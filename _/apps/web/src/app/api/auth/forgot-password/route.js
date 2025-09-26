export async function POST(request) {
  const body = await request.json();
  const { government_id } = body;

  // Simulate forgot password - always successful for prototype
  return Response.json({ 
    success: true, 
    message: "OTP sent to registered mobile number",
    requiresOTP: true
  });
}