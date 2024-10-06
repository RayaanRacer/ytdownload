const express = require("express");
const axios = require("axios");
const cors = require("cors");
const FormData = require("form-data"); // Import FormData to create form data
const app = express();

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const { videoid } = req.body;

  // Create form data
  const formData = new FormData();
  formData.append("videoid", videoid);
  formData.append("downtype", "mp3");
  formData.append("vquality", "320");

  try {
    // Make POST request using axios with form data
    const response = await axios.post(
      "https://bcfb.mmnm.store/oajax.php",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Set headers for form data
        },
      }
    );

    // Respond with the data from the API
    return res.status(200).json(response.data);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: "Request failed", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
