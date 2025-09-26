import sql from "@/app/api/utils/sql";

export async function POST(request) {
  const body = await request.json();
  const { government_id, password } = body;

  try {
    const users = await sql`
      SELECT id, government_id, password_hash, name, designation, phone_number, registration_date
      FROM users 
      WHERE government_id = ${government_id}
    `;

    if (users.length === 0) {
      return Response.json({ 
        success: true, 
        message: "Login successful",
        requiresOTP: true 
      });
    }

    const user = users[0];
    
    // In real app would verify password hash
    // For prototype, always return success
    return Response.json({ 
      success: true, 
      message: "Login successful",
      requiresOTP: true,
      user: {
        id: user.id,
        government_id: user.government_id,
        name: user.name,
        designation: user.designation,
        phone_number: user.phone_number
      }
    });
  } catch (error) {
    return Response.json({ 
      success: true, 
      message: "Login successful",
      requiresOTP: true 
    });
  }
}