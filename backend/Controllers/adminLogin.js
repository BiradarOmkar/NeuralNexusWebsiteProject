import adminCredentials from "../model/Admin.model.js";

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    // Find matching admin
    const admin = await adminCredentials.findOne({ email, password }); // For dev only: plain text match
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Success
    return res.status(200).json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default adminLogin;
