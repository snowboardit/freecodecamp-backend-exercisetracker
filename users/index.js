const User = require("../user");

class Users {
  #users = new Map();

  add(username) {
    const user = new User(username),
      id = user.getId()
    this.#users.set(id, user)
    return user.getDetails()
  }

  exists(id) {
    if (id) return !!this.#users.get(id)
    throw this.invalidIdError(id)
  }

  all() {
    const returner = []
    for (let user of this.#users.values()) {
      const u = user.getDetails()
      returner.push(u)
    }
    return returner
  }

  getUserById(id) {
    if (id) return this.#users.get(id)
    throw this.invalidIdError(id)
  }

  invalidIdError(id) {
    return new Error(`invalid id ${id} provided`)
  }
}


module.exports = Users