import "dotenv/config.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { app } from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
