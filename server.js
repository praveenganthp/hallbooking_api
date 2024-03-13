// const express = require("express")
// const app = express()

// let halls =[];
// //middleware
// app.use(express.json())

// app.post("/hall",function(req,res){
//     req.body.id=halls.length+1;
//     halls.push(req.body);
//     res.json("hall created successfully");
// });

// app.get("/halls",function(req,res){
//     res.json(halls)
//     console.log(halls)
// })






// app.listen(3001)


const express = require("express");
const app = express();

let rooms = [];

// Middleware
app.use(express.json());

// Create a room
app.post("/room", function (req, res) {
  const newRoom = {
    id: rooms.length + 1,
    name: req.body.name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    pricePerHour: req.body.pricePerHour,
    bookings: [],
  };
  rooms.push(newRoom);
  res.json("Room created successfully");
});

// Book a room
app.post("/book", function (req, res) {
  const { customerId, date, startDate, endDate, roomId } = req.body;
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    return res.status(404).json("Room not found");
  }
  const newBooking = {
    customerId,
    date,
    startDate,
    endDate,
    bookingId: room.bookings.length + 1,
    bookingStatus: "Booked",
    bookingDate: new Date().toISOString(),
  };
  room.bookings.push(newBooking);
  res.json("Room booked successfully");
});

// List all rooms with booked data
app.get("/rooms", function (req, res) {
  const roomsWithBookings = rooms.map((room) => {
    return {
      id: room.id,
      name: room.name,
      booked: room.bookings.length > 0 ? true : false,
      bookings: room.bookings,
    };
  });
  res.json(roomsWithBookings);
});

// List all customers with booked data
app.get("/customers", function (req, res) {
  let customers = [];
  rooms.forEach((room) => {
    room.bookings.forEach((booking) => {
      customers.push({
        customerId: booking.customerId,
        date: booking.date,
        roomId: room.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    });
  });
  res.json(customers);
});

// List how many times a customer has booked a room
app.get("/customer/bookings", function (req, res) {
  const { customerId } = req.query;
  let customerBookings = [];
  rooms.forEach((room) => {
    room.bookings.forEach((booking) => {
      if (booking.customerId === customerId) {
        customerBookings.push({
          customerId: booking.customerId,
          date: booking.date,
          startDate: booking.startDate,
          endDate: booking.endDate,
          bookingId: booking.bookingId,
          bookingStatus: booking.bookingStatus,
          bookingDate: booking.bookingDate,
        });
      }
    });
  });
  res.json(customerBookings);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
