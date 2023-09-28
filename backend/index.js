const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const corsOptions = {
  origin: "https://blog-app-git-main-ofrajsingh.vercel.app/",
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true, // Allow credentials (cookies, headers, etc.)
// };

app.use(cors(corsOptions));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected successfully");
  } catch (err) {
    console.error(err);
  }
};

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://blog-app-git-main-ofrajsingh.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log("App is running on port " + PORT);
});
