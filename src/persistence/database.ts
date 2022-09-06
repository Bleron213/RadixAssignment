import { Sequelize } from 'sequelize'

// setup a new database using database credentials set in .env
var sequelizeInstance = new Sequelize("database", "", "", {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Data is stored in the file `database.sqlite` in the folder `db`.
    // Note that if you leave your app public, this database file will be copied if
    // someone forks your app. So don't use it to store sensitive information.
    storage: "/db/database.sqlite"
  });


// authenticate with the database
sequelizeInstance
    .authenticate()
    .then(function (err: any) {
    console.log("Connection established.");
    })
    .catch(function (err: any) {
    console.log("Unable to connect to database: ", err);
});

export default sequelizeInstance;

