# Configurator

A Configuration DSL

## What is it?

A DSL that can be used to allow controlled modification of a key/value configuration object.

The DSL seperates the specification of the modifications from the interpretation. It achieves this through a simple data structure, similar to an AST. Though, in this case it is only a list, not even a tree.

The interpreter can then be written to perform the actions on the underlying configuration structire.

## Installation

Not (yet?) published to npm. If you want to try it, you can install it from git.

```shell
npm install --save https://github.com/tekerson/configurator.git
```

## Usage

```javascript
import configurator from '@configurator/configurator';
import interpret from '@configurator/interpreters/mutable-object';

const customize = configurator(cfg => {
  cfg.set('appName', 'My App Name');
  cfg.set('key', 'mysupersecretkey');
  cfg.modify('appName', name => name.toUpperCase());
});

const defaultConfig = {
  appName: 'A Default Name',
  key: ''
};

const customized = interpret(customization, defaultConfig);
```
