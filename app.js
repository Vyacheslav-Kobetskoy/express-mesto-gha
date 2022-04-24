
const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routes/users");
const CardRouter = require("./routes/cards")

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6264fa770b412335c0b00316'
  };
  next();
});

app.use(UserRouter);
app.use(CardRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)

})

// app.listen(PORT);