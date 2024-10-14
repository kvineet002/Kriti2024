const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const postsRoutes = require("./routes/postsRoutes");
const geminiRoutes = require("./routes/geminiRoutes")
const devRoutes = require("./routes/devRoutes");
const sparkRoutes = require("./routes/sparkRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;


connect(
  process.env.MONGODB_URI
).then(()=>{
  console.log("Connected to the database");
});

app.use(cors({origin:['https://dihingatkriti2024.vercel.app','https://collampus.vercel.app','http://localhost:3000','https://www.devbranch.in','https://sparkwall.vercel.app']}));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/project", projectRoutes);
app.use("/reviews", reviewRoutes);
app.use("/post", postsRoutes);
app.use("/ai", geminiRoutes);
app.use("/devbranch",devRoutes);
app.use("/spark",sparkRoutes);
// app.use("/notification", notificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
