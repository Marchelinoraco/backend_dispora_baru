import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import database from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";
import ProgramRoute from "./routes/ProgramRoute.js";
import RegProgramRoute from "./routes/RegProgramRoute.js";
import FileUpload from "express-fileupload";
import GaleriRoute from "./routes/GaleriRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: database,
});

// (async () => {
//   await database.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(BeritaRoute);
app.use(ProgramRoute);
app.use(RegProgramRoute);
app.use(GaleriRoute);

app.get("/", (req, res) => {
  res.send("<h1>BackendDispora</h1>");
});

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
