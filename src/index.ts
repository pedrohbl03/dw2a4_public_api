import app from "./app";

const config = require("./config/config");

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});
