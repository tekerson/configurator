const property = require('tape-jsverify');

const configurator = require('./configurator');

property('calling `set` adds a `Set` instruction to the sequence', (jsc) =>
  jsc.forall('string', 'string', (key, value) => {
    const seq = configurator(c => {
      c.set(key, value);
    });

    return seq[0]({
      Set: (k, v) => k === key && v === value,
      Mod: () => false,
    })
  })
);

property('calling `modify` adds a `Mod` instruction to the sequence', (jsc) =>
  jsc.forall('string', 'string -> string',(key, fn) => {
    const seq = configurator(c => {
      c.modify(key, fn);
    });

    return seq[0]({
      Mod: (k, f) => k === key && f === fn,
      Set: () => false,
    })
  })
);

property('calling multiple commands times creates a sequence of instructions', (jsc) =>
  jsc.forall('[string]', 'bool', 'string', 'string -> string', (keys, useSet, value, fn) => {
    const seq = configurator(c => {
      keys.forEach(key => {
        useSet ? c.set(key, value) : c.modify(key, fn);
      });
    });

    return seq.length === keys.length;
  })
);
