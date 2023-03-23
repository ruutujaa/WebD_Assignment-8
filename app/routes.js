var Users = require("./models/sample");
const path = require("path");
const bodyParser = require('body-parser');


// This will display all the details that are successfully entered in the database.
module.exports = (app) => {
  app.get("/user/getAll", async (req, res) => {
    try {
      const samples = await Users.find({});
      res.json(samples);
      console.log(samples);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  
    //This will validate if the email is valid or not
    //We are using regex below.
    app.post("/user/create", bodyParser.json(), function (req, res) {
      var email = "";
      var password = "";
      var fullname = "";
  
      var regexEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
      var regexPassword =
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,14})";
      // var fullname = /^[a-z ,.'-]+$/;
      var email = String(req.body.email);
      var password = String(req.body.password);
      var fullname = String(req.body.fullname);
  
      if (!email.trim().match(regexEmail)) {
        res.status(400);
        res.json({ message: "Please Enter a Valid Email ID" });
      } else if (!password.trim().match(regexPassword)) {
        res.status(400);
        res.json({
          message:
            "Password should be atleast 8-14 characters long and must contain atleast an uppercase letter, lowercase letter, special character and also a numeric character ",
        });
      } else {
        var record = new Users(req.body);

          try {
            const savedModel =  record.save();
            console.log('Model saved successfully:', savedModel);
            res.json({message:"User created successfully"});
          } catch (error) {
            console.error('Error while saving model:', error);
          }
          
      }
    });
  
    // This is to update the email and password.
   app.put("/user/edit", async (req, res) => {
  try {
    const { currentEmail, currentPassword, newEmail, newPassword } = req.body;

    const updatedUser = await Users.findOneAndUpdate(
      { email: currentEmail, password: currentPassword },
      { email: newEmail, password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      res.status(400).json({ message: "This ID does not exist, please enter a valid ID" });
    } else {
      res.json({ message: "Email and password updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

  

//delete
 app.delete("/user/delete", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOneAndDelete({ email, password });
      if (!user) {
        return res.status(400).json({ message: "user deleted successfully" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });
  
  };
  