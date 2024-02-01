const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

connect(
  "mongodb+srv://auth-admin:AdHDOvAtNy8He2l3@cluster0.s875rof.mongodb.net/Kriti2024(Dihing)"
);
// {origin:'https://kriti2024.vercel.app'}
const allowedOrigins = [, 'http://localhost:3000'];
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/project", projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
