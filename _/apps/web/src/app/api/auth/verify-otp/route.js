export async function POST(request) {
  const body = await request.json();
  const { otp, government_id } = body;

  // Simulate OTP verification - always successful for prototype
  return Response.json({ 
    success: true, 
    message: "OTP verified successfully",
    token: "simulated_jwt_token_12345"
  });
}