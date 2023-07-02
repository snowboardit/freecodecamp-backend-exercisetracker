const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  Users = require('./users')
require('dotenv').config()

// config
const BASE = '/api',
  users = new Users()

// middleware
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(bodyParser.json()) // application/json
// app.use(currentRouteMiddleware)

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/** 
  GET - /api/users - get all users
  
  User = {
    username: string,
    _id: string
  }
  returns User[]
*/
app.get(`${BASE}/users`, (req, res) => {
  const allUsers = users.all()
  res.json(allUsers)
})

/** 
  GET - /api/users/:_id/logs - get user with all exercises
  { 
    from?, // yyyy-mm-dd format
    to?, // yyyy-md-dd format
    limit? = 10 // 
  } = req.query.params

  Exercise {
    description: string,
    duration: number, // minutes
    date: string, // date string
  }

  returns {
    username: string,
    count: number,
    _id: string,
    log: Exercise[]
  }
*/
app.get(`${BASE}/users/:_id/logs`, (req, res) => {
  const id = req.params._id,
    {
      from, // yyyy-mm-dd format
      to, // yyyy-md-dd format
      limit = 10
    } = req.query

  try {
    const user = users.getUserById(id),
      details = user.getDetails(),
      count = user.getLogSize(),
      logs = user.getLogs(from, to, limit),
      userDetail = {
        ...details,
        count,
        log: logs
      }
    res.json(userDetail)
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`failed to get user logs with id: ${id}`)
  }
})

/** 
  POST - /api/users - add a new user
  username = req.body.username
  
  returns { username, _id }
*/
app.post(`${BASE}/users`, (req, res) => {
  const { username } = req.body
  try {
    const newUser = users.add(username);
    res.json(newUser);
  } catch (error) {
    console.error(error.message)
    if (error instanceof Error) res.json({ error: error.message })
  }
})

/**
  POST - /api/users/:_id/exercises - add exercise
  { description, duration, date? = new Date() } = req.body
  
  UserExerciseResponse = {
    username: string,
    description: string,
    duration: number,
    date: Date, // date string
    _id: string
  }
  returns User[]
*/
app.post(`${BASE}/users/:_id/exercises`, (req, res) => {
  let { date } = req.body;
  const { description, duration } = req.body,
    id = req.params._id,
    user = users.getUserById(id);
  date = date ?? new Date();
  // add new log
  const log = user.addLog(description, duration, date),
    returner = { ...user.getDetails(), ...log }
  res.json(returner);
});

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
