const { v4: uuidv4 } = require('uuid');

class User {
  #_id = ''
  #username = ''
  #logs = []

  constructor(username) {
    if (!!username) {
      this.#_id = uuidv4()
      this.#username = username
      return this
    }
    throw new Error('No username provided')
  }

  get() {
    return {
      _id: this.#_id,
      username: this.#username
    }
  }

  getId() {
    return this.#_id
  }

  addLog(description, duration, date) {
    const newDate = !!date ? new Date(date) : new Date()
    this.#logs.push({
      description,
      duration,
      date: newDate
    })
  }

  getLogSize() {
    return this.#logs.length
  }

}

module.exports = User
