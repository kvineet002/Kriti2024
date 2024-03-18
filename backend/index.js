const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const postsRoutes = require("./routes/postsRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

connect(
  "mongodb+srv://auth-admin:t2YuYPDKGPIztKib@cluster0.s875rof.mongodb.net/Kriti2024(Dihing)"
);

app.use(cors({origin:['https://dihingatkriti2024.vercel.app','http://localhost:3000']}));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/project", projectRoutes);
app.use("/reviews", reviewRoutes);
app.use("/post", postsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
