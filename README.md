# @everymundo/cleanrequire
Cleans nodejs require.cache for a given module and requires it again. Very useful for testing purposes.

## installation

```sh
npm install @everymundo/cleanrequire
```

## usage

By using the regular `require` function from nodejs the result will be cached and the subsequent requests will not even touch the file again. The value will be returned from the cache. That is awesome for 99.9% of the cases.

But, sometimes, you want to require a file and you want nodejs to read it over and over again. For those cases you can use the [cleanrequire](https://github.com/danielsan/cleanrequire) library.


```js
const cleanrequire = require('@everymundo/cleanrequire');

let libIwantToReloadEveryTime = cleanrequire('./lib/lib-i-want-to-reload-every-time');

libIwantToReloadEveryTime.doSomething();

libIwantToReloadEveryTime = cleanrequire('./lib/lib-i-want-to-reload-every-time');

libIwantToReloadEveryTime.doSomething();
```

Let's say you have a file name [datetime](/test/resources/datetime.js) with the following code

```js
module.exports = new Date().toJSON();
```

By using the regular `require` function, it will only run that code once, no matter how many times you call it.

But when using `cleanrequire` function, it will run that code every single time you call it.

Check the [test file](test/index.test.js) for more details

## Considerations

* This library was created mainly to be used in test code, not production code.
* It does not have the intention to be fast, in fact it is much slower than the regular `require`
* It does not have the intention to replace the regular require.
