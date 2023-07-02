const axios = require('axios').default;

async function main() {

    const BASE = 'http://localhost:3000/api'
    // create new user
    const newUser = (await axios.post(`${BASE}/users`, { username: 'great_user' })).data,
        id = newUser._id
    console.log({ newUser })

    // add a new exercise to the user
    // id
    // description
    // duration
    // date (optional)
    const description = 'big muscles workout',
        duration = 60,
        date = null,
        newExercise = (await axios.post(`${BASE}/users/${id}/exercises`, { description, duration, date })).data;
    console.log({ newExercise })

    // get user log
    const userLog = (await axios.get(`${BASE}/users/${id}/logs`)).data;
    console.log({ userLog, logs: userLog.log })

}

main()