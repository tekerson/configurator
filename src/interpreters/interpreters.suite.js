const configurator = require('../configurator');

const property = require('tape-jsverify');

module.exports = (interpret) => {
  property('setting a value adds it to the map', (jsc) =>
    jsc.forall('dict string', 'string', 'string', (initial, key, value) => {
      const seq = configurator(c => {
        c.set(key, value);
      });

      const result = interpret(seq, initial);

      return result[key] === value;
    })
  );

  property('modifying a value mutates the existing value', (jsc) =>
    jsc.forall('dict string', 'string', 'string', (initial, key, value) => {
      const seq = configurator(c => {
        c.set(key, value);
        c.modify(key, (v) => v.toUpperCase());
      });

      const result = interpret(seq, initial);

      return result[key] === value.toUpperCase();
    })
  );

  property('modifying a value multiple times results in the final value', (jsc) =>
    jsc.forall('dict string', 'string', 'nearray string', (initial, key, values) => {
      const seq = configurator(c => {
        values.forEach(value => {
          c.set(key, value);
        });
      });

      const result = interpret(seq, initial);

      return result[key] == values[values.length - 1]
    })
  );
};
