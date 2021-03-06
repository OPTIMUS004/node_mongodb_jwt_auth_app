// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");
const Role = db.role;

db.mongoose
.connect(`mongodb+srv://Integral:oluwaseun2@@cluster1-jwt-practice.1nlz5.mongodb.net/DB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully Connected to MongoDB!.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});

var corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));

//simple route to base of server
app.get("/", (req, res) => {
    res.json({message: "Welcome to Integrgal application."});
});

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//set port, listens for requests to the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


function initial() {
    Role.estimatedDocumentCount((err, count) =>{
        if (!err && count === 0) {
            new Role ({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection ");
            });
            new Role ({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection ");
            });
            new Role ({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection ");
            });
        }
    });
}