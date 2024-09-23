const express = require("express");
const axios = require("axios");
const app = express();
const apiKey = "7e179d9c382d06156d73cc3d716728d7"; // Replace with your API key

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Render the index.ejs file on the home route
app.get("/", (req, res) => {
  res.render("index");
});

// Handle the weather fetching
app.post("/weather", async (req, res) => {
  let inputVal = req.body.city;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  try {
    // Fetch the weather data
    const weatherResponse = await axios.get(weatherUrl);
    const { main, name, sys, weather } = weatherResponse.data;

    res.json({
      name,
      country: sys.country,
      temp: Math.round(main.temp),
      icon: weather[0]["icon"],
      description: weather[0]["description"]
    });
  } catch (error) {
    res.status(400).json({ error: "Please search for a valid city 😩" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
