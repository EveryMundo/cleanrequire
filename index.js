'use strict';
const path = require('path');

const firstMatchOrCWD = (firstMatch) =>
  Array.isArray(firstMatch) ? path.dirname(firstMatch[2]) : process.cwd();

const cleanrequire = (libpath) => {
  if (!/^\./.test(libpath)) return removeCacheAndLoad(libpath);

  const
    err = new Error(''),
    { stack } = err,
    firstI = stack.indexOf('\n', stack.indexOf('\n') + 1),
    secndI = (stack + '\n').indexOf('\n', firstI + 1),
    firstMatch = stack.substring(firstI, secndI).match(/\s+\(?(\/([^:]+):\d+)/),
    // baseDir = firstMatch ? path.dirname(firstMatch[2]) : process.cwd();
    baseDir = firstMatchOrCWD(firstMatch);

  const libFile = '/' + path.join(baseDir, libpath).replace(/^\//, '');

  return removeCacheAndLoad(libFile);
};

const removeCacheAndLoad = (libFile) => {
  const resolved = require.resolve(libFile);
  if (resolved in require.cache) delete require.cache[resolved];

  return require(resolved);
};

cleanrequire.firstMatchOrCWD = firstMatchOrCWD;

module.exports = cleanrequire;
