const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const apiKey = "Your_api_key"; // Add your API key directly here

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Render the index.ejs file on the home route
app.get("/", (req, res) => {
  res.render("index");
});

// Handle weather data fetching
app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { main, name, sys, weather } = response.data;

    res.json({
      name,
      country: sys.country,
      temp: Math.round(main.temp),
      icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`,
      description: weather[0].description,
    });
  } catch (error) {
    res.status(400).json({ error: "Please search for a valid city 😩" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
