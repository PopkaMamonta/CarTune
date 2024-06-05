require('dotenv').config();

const connectDB = require('./config/dbConnect');
const express =require('express')
const exphbs=require('express-handlebars')
const app=express()
const mongoose = require('mongoose');
const homeRoutes=require('./routes/root')
const userRoutes = require('./routes/userRoute');
const session = require('express-session');
const routes = require('./routes/userRoute');
const carRoutes = require('./routes/carRoute');
const presetRoutes = require('./routes/presetRoute');

const hbs=exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/constructor', (req,res)=>{
    res.render('constructor')
})
app.get('/cars', (req,res)=>{
    res.render('construct_car')
})

app.use(express.json());
app.use('/', homeRoutes);
app.use('/user', userRoutes);
app.use('/api', routes);
app.use('/car',carRoutes);
app.use('/preset',presetRoutes);

const PORT=process.env.PORT || 3000

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

connectDB();