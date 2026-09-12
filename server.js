const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const songRoutes = require("./routes/songRoutes");

app.use("/artists",artistRoutes);
app.use("/albums", albumRoutes);
app.use("/songs", songRoutes);

const PORT = 5000;  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});