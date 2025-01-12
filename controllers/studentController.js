const Setup = require('../helpers/Setup');
const  {connection} = require('../dbConfig');
exports.studentRegister = async (req, res) => {
  try {
    const { email_id, password, first_name, last_name } = req.body;

    // Validate required fields
    if (!email_id || !password || !first_name) {
      return res.status(400).json({ message: "Email, password, and first name are required." });
    }
    const clg_id = "VU1S000001"; // Default clg_id
    const branch = "Comps";      // Default branch
    const degree_year = "2026";  // Default degree_year
    const role = false;
    const degree = "BE";         // Default degree
    const ac_yr = "2026";

    // Execute the query using Setup.createStudent
    const result = await Setup.createStudent(
        email_id,
        password,
        first_name,
        last_name,
        role,
        clg_id,
        branch,
        degree_year,
        ac_yr,
        degree,
    );

    // Respond with success
    res.status(201).json({
      message: "Student registered successfully",
      studentId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating student record." });
  }
};
// In your backend controllers (e.g., studentController.js)

exports.studentLogin = async (req, res) => {
    try {
      const { email_id, password } = req.body;
  
      // Query to find the student by email
      const query = `SELECT * FROM tpo_student_details WHERE email_id = ?`;
      const [rows] = await connection.query(query, [email_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Get user data from DB
      const user = rows[0];
  
      // Compare password
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Return first_name and role
      res.status(200).json({
        message: "Login successful",
        student_id: user.student_id,
        firstName: user.first_name,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during login" });
    }
  };
  