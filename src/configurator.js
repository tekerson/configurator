const daggy = require('daggy');

const Config = daggy.taggedSum({
  Set: ['key', 'value'],
  Mod: ['key', 'fn'],
});

/* Configurator */

module.exports = (c) => {
  let seq = [];
  const set = (key, value) => { seq.push(Config.Set(key, value)); };
  const modify = (key, fn) => { seq.push(Config.Mod(key, fn)); };

  c({
    set,
    modify,
  });

  return seq.map(action => action.cata.bind(action));
};
