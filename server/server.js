/**
 * @file server.js
 * @description Boot the app and start listening.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

 import app from './app';
 // Configurations
import serverConfig from './config';

 const PORT = serverConfig.port;

// Start Server
const server = app.listen(PORT, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}`); // eslint-disable-line
  } else {
    console.log(error); // eslint-disable-line
  }
});

export default server;