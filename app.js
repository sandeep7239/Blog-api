const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const categoryRoute=require('./api/routes/category');
const blogRoute=require('./api/routes/blog');
const userRoute=require('./api/routes/user');
const fileUpload=require('express-fileupload');

mongoose
  .connect('mongodb+srv://abhisan72:12345tjaabc@customer.n0ubcuw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Connection failed', err);
    process.exit(1); // Terminate the application on DB connection failure
  });
app.use(fileUpload({
    useTempFiles:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/category',categoryRoute);
app.use('/blog',blogRoute);
app.use('/user',userRoute);

app.get('*',(req,res)=>{
        res.status(200).json({
            message:'The page you are looking for is not found'
        });
})

module.exports=app;