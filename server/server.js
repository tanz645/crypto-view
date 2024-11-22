//Config express
const express = require("express");
const dotenv = require("dotenv");
const process = require("process");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const workoutRoutes = require("./routes/workouts.js");
const usersRoutes = require("./routes/users.js");
const transactionsRoutes = require("./routes/Transactions.js");
const userPortfolio = require("./routes/userPortfolio.js");
const nftRoutes = require("./routes/nft.js");
const cryptoTransactionRoutes = require("./routes/cryptoTransactions.js")
const tokenRoutes = require("./routes/token.js")

dotenv.config();

const app = express();

// configuration cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://api.coingecko.com/"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(helmet());

// middleware pour parser le json
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
}));
// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/portfolio/", userPortfolio);
app.use("/api/transactions/", transactionsRoutes);
app.use("/api/users/", usersRoutes);
app.use("/api/nft/", nftRoutes);
app.use("/api/crypto-transactions/", cryptoTransactionRoutes);
app.use("/api/token/", tokenRoutes);

//connect to db et lancement du server
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen requests
    console.log(`connected to db`);
  })
  .catch((error) => {
    // console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
