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

  getDetails() {
    return {
      _id: this.#_id,
      username: this.#username
    }
  }

  getId() {
    return this.#_id
  }

  addLog(description, duration, date) {
    const normalDate = !!date ? new Date(date) : new Date(),
      newLog = {
        description,
        duration,
        date: normalDate
      }
    this.#logs.push(newLog)
    return newLog
  }

  getLogs(from, to, limit) {
    let returner = this.#logs;
    returner = this.filterLogs(returner, from, to, limit);
    returner = this.toHumanLogs(returner);
    return returner;
  }

  toHumanLogs(logs) {
    return logs.map((log) => {
      return {
        ...log,
        date: log.date.toString()
      }
    });
  }

  filterLogs(logs, from, to, limit) {
    let filteredLogs = [...logs];
    console.log({ logs });

    if (from) {
      const fromDate = new Date(from);
      filteredLogs = filteredLogs.filter((log) => new Date(log.date) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);
      filteredLogs = filteredLogs.filter((log) => new Date(log.date) <= toDate);
    }

    if (limit) {
      filteredLogs = filteredLogs.slice(0, limit);
    }

    return filteredLogs;
  }

  getLogSize() {
    return this.#logs.length
  }

}

module.exports = User
