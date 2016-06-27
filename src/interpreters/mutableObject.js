module.exports = (seq, initial) =>
  seq.reduce((config, action) => action({
    Mod: (key, fn) => { config[key] = fn(config[key]); return config; },
    Set: (key, val) => { config[key] = val; return config; },
  }), initial);
