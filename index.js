require('dotenv').config();

const connectDB = require('./config/dbConnect');
const express =require('express')
const exphbs=require('express-handlebars')
const app=express()
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const session = require('express-session');
const routes = require('./routes/userRoute');


const hbs=exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.use(express.json());

app.use('/', require('./routes/root'));
app.use('/user', userRoutes);
app.use('/api', routes);
app.use('/api', require('./routes/userRoute'));

app.get('/', (req, res) => {
    if (req.session && req.session.user) {
        res.send('Welcome to the home page!');
    } else {
        res.redirect('/login');
    }
});

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