'use strict';
const path = require('path');

const cleanrequire = (libpath) => {
  const
    err = new Error(''),
    { stack } = err,
    firstI = stack.indexOf('\n', stack.indexOf('\n') + 1),
    secndI = (stack + '\n').indexOf('\n', firstI + 1),
    firstMatch = stack.substring(firstI, secndI).match(/\s+\(?(\/([^:]+):\d+)/),
    libFile = '/' + path.join(path.dirname(firstMatch[2]), libpath);

  delete require.cache[require.resolve(libFile)];
  return require(libFile);
};

module.exports = cleanrequire;
