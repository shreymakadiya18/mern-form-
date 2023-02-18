const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/registration",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndex:true
})


// .then(()=>{
//     console.log(`connection successful`);
// })

.catch((e)=>{
    console.log(`no connection${e}`);
});

