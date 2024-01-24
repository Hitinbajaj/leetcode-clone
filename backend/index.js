const express = require("express");
const PORT = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const problemsRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const userRoutes = require ("./routes/userRoutes");
const runRoutes = require ("./routes/runRoutes");
const {connectDB} = require("./config/db");

connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/problems", problemsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/execute", runRoutes);

app.use("/", (req, res) => {
    res.json({ message: "API running...." });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
