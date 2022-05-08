<div align="center">
  <h1>Hotel management system</h1>
  <strong>Website, desktop app, server, and database for hotel management</strong>
</div>
<br>

## Hotel management system
1. A single page website is a place to serve customers.
2. A desktop app built using [Electron](https://www.electronjs.org/) that is used to manage the hotel.
3. A [NodeJS](https://nodejs.org/en/) server.
4. A [MySQL](https://www.mysql.com/) database.

## Initialization
1. Go to `Web/server` folder and run `createDB.js` and `createTAB.js` to create the database.
3. Go to `Web` folder and run `node app.js` to boot the server.
4. Access the website by go to http://localhost:3000
5. Go to `Desktop App` folder.
6. Run `electron-packager ./` to build the desktop app.
7. Go to the newly created folder and run 'desktop-app.exe' to use the desktop app.