# dli-switch

DLI Web Power Switch Controller.

## Installing

Using npm:

`npm install dli-switch`

## Examples

```js
const Switch = require('dli-switch');

const mySwitch = new Switch('192.168.1.100', 'username, 'password');

(async () => {
  // Get Outlet State
  let outlet1State = await s.getState(1);

  // Set Outlet State
  await s.setState(1, true); // on
  await s.setState(1, false); // off

  // Turn Outlet On, Off, and Toggle
  await s.turnOn(1);
  await s.turnOff(1);
  await s.toggle(1);
})();
```