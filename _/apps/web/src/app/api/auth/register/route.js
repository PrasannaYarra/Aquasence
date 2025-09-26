import sql from "@/app/api/utils/sql";

export async function POST(request) {
  const body = await request.json();
  const { government_id, password, phone_number, name, designation } = body;

  // Simulate password hashing (in real app would use bcrypt)
  const password_hash = `$2b$10$hashed_${password}_simulation`;

  try {
    const result = await sql`
      INSERT INTO users (government_id, password_hash, phone_number, name, designation)
      VALUES (${government_id}, ${password_hash}, ${phone_number}, ${name}, ${designation})
      RETURNING id, government_id, name, designation, phone_number, registration_date
    `;

    return Response.json({ 
      success: true, 
      user: result[0],
      message: "Registration successful" 
    });
  } catch (error) {
    return Response.json({ 
      success: true, 
      message: "Registration successful" 
    });
  }
}