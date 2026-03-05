const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

// connect redis
const client = redis.createClient();

client.on("error", (err) => {
    console.log("Redis error:", err);
});

client.connect();

// total tickets
let tickets = 100;

// booking API
app.post("/api/book", async (req, res) => {

    const lock = await client.set("lock", "locked", {
        NX: true,
        EX: 5
    });

    if (!lock) {
        return res.status(409).json({
            success: false,
            message: "Another booking in progress"
        });
    }

    if (tickets <= 0) {
        return res.json({
            success: false,
            message: "Sold Out"
        });
    }

    tickets--;

    const bookingId = Date.now();

    res.json({
        success: true,
        bookingId,
        remaining: tickets
    });

});

module.exports = app;
