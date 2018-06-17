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

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
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


app.listen(8080, () => {
    console.log('app is running on port 8080');
})


/*


/signin -- Post request with response with success/fail

/register -- Post request with response of the new user {update the database} 

/profile/:userId --- Get request with response of the user

/image --> Put request with updated user object

*/