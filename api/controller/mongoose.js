const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log("error setting up database"));