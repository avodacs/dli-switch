const debug = require('debug')('dli-switch:Switch');
const request = require('request');

class Switch {
  constructor(ip, username, password) {
    this.ip = ip;
    this.username = username;
    this.password = password;
  }

  async getState(outletId) {
    const decrementedOutletId = outletId - 1;

    let url = `http://${this.ip}/restapi/relay/outlets/${decrementedOutletId}/state/`;

    return new Promise(async (resolve, reject) => {
      try {
        request.get(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF': 'x'
          },
          auth: {
            user: this.username,
            pass: this.password,
            sendImmediately: false
          }
        }, (err, response, body) => {
          resolve(body === 'true');
        })
      } catch (err) {
        reject(err);
      }
    });
  }

  async setState(outletId, state) {
    debug(`Setting outlet ${outletId} state to ${state}`);

    const decrementedOutletId = outletId - 1;

    let url = `http://${this.ip}/restapi/relay/outlets/${decrementedOutletId}/state/`;

    return new Promise(async (resolve, reject) => {
      try {
        await request.put(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF': 'x'
          },
          auth: {
            user: this.username,
            pass: this.password,
            sendImmediately: false
          },
          form: {
            value: state
          }
        })

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  toggle(outlet) {
    debug(`Toggling Outlet ${outlet}`);

    return new Promise(async (resolve, reject) => {
      try {
        let outletState = await this.getState(outlet);

        await this.setState(outlet, !outletState);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async turnOn(outlet) {
    debug(`Turning on Outlet ${outlet}`);

    return new Promise(async (resolve, reject) => {
      try {
        await this.setState(outlet, true);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async turnOff(outlet) {
    debug(`Turning off Outlet ${outlet}`);

    return new Promise(async (resolve, reject) => {
      try {
        await this.setState(outlet, false);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Switch;
