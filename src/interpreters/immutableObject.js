module.exports = (seq, initial) =>
  seq.reduce((config, action) => action({
    Mod: (key, fn) => Object.assign({}, config, { [key]: fn(config[key]) }),
    Set: (key, val) => Object.assign({}, config, { [key]: val }),
  }), initial);
