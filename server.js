// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// // var methodOverride = require("method -override");
// var mongoose = require("mongoose");
// var cors = require('cors');

// var port = process.env.PORT || 6060;

// mongoose.connect("mongodb+srv://ghogarer:ghogarer@cluster0.csmapui.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(methodOverride("X-HTTP-Method-Override"));
// app.use(express.static(__dirname + "/public"));
// require("./app/routes")(app);
// app.listen(port);
// console.log(`App started at port ${port}`);


// mongoose.connection.on('error', function (err) {
//     console.log('database connection error');
//     console.log(err)
//     //process.exit(1)
// }); // end mongoose connection error
// mongoose.connection.on('open', function (err) {
//     if (err) {
//         console.log("database error");
//         console.log(err);
//     } else {
//         console.log("database connection open success");
//     }
//     //process.exit(1)
// }); // enr mongoose connection open handler
// exports = module.exports = app;






var express = require("express");
var app = express();

const port = 8080;
//This is body parser
// const bodyParser = require("body-parser");
const routes = require("./app/routes");
const bodyParser = require('body-parser');



//This will connect the database
const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://ghogarer:ghogarer@cluster0.csmapui.mongodb.net/?retryWrites=true&w=majority"
// );
mongoose.connect("mongodb+srv://ghogarer:ghogarer@cluster0.csmapui.mongodb.net/?retryWrites=true&w=majority");
// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

mongoose.connection.on("connected", function () {
  console.log("DB connected");
});

//routing
routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
