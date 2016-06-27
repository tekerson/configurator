const property = require('tape-jsverify');

const configurator = require('../configurator');
const interpret = require('./mutableObject');

const suite = require('./interpreters.suite');

suite(interpret);

property('running the interpreter mutates the initial object', (jsc) =>
  jsc.forall('dict string', 'string', 'string', (initial, key, value) => {
    const seq = configurator(c => {
      c.set(key, value);
    });

    const result = interpret(seq, initial);

    return result === initial;
  })
);
