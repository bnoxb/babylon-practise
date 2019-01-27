require('./db/db');
const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const mongoose          = require('mongoose');
const morgan            = require('morgan');
const session           = require('express-session');
const port              = 3000;

const shipController    = require('./controllers/shipController'); 

//Middleware
app.use(methodOverride('_method'));
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/ship', shipController);

app.get('/',(req, res)=>{
    res.render('index.ejs')
})

app.listen(port, ()=>{
    console.log(`server is listening on port: ${port}`);
})