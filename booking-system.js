const express = require("express");
const app = express();

app.use(express.json());

// total tickets
let tickets = 100;


// homepage route
app.get("/", (req, res) => {
  res.send("Concurrent Ticket Booking API Running");
});


// booking API
app.post("/api/book", (req, res) => {

  if (tickets <= 0) {
    return res.json({
      success: false,
      message: "All tickets sold out"
    });
  }

  tickets--;

  const bookingId = Date.now();

  res.json({
    success: true,
    bookingId: bookingId,
    remaining: tickets
  });

});


// export for Vercel
module.exports = app;


// run locally
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Booking system running on port 3000");
  });
}