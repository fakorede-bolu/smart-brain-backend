const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');

const signin = require('./controllers/signin');


const profile = require('./controllers/profile');


const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'boluwatife',
        database: 'smart_brain_db'
    }
});

// db.select('*').from('users').then(data => {
//     ;

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("it is working");
})

// --------SIGN-IN API --------------
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt )});


//---------------REGISTER API ----------

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

// -------------PROFILE API ------------

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// ------------ IMAGE API --------------

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 8080, () => {
    console.log('app is running on port ${process.env.PORT}');
})


/*


/signin -- Post request with response with success/fail

/register -- Post request with response of the new user {update the database} 

/profile/:userId --- Get request with response of the user

/image --> Put request with updated user object

*/