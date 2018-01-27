'use strict';

/* eslint-env mocha */
/* eslint-disable no-unused-expressions,no-konsole */

const
  { expect } = require('chai'),
  cleanrequire = require('../');

describe('require', () => {
  it('require should cache and return cached version on a second call', (done) => {
    const datetimeA = require('./resources/datetime');
    setTimeout(() => {
      const datetimeB = require('./resources/datetime');
      expect(datetimeA).to.equal(datetimeB);
      done();
    }, 10);
  });
});

describe('cleanrequire', () => {
  it('cleanrequire should return a NON CACHED version on a second call', (done) => {
    const datetimeA = require('./resources/datetime');
    setTimeout(() => {
      const datetimeB = cleanrequire('./resources/datetime');
      expect(datetimeA).to.not.equal(datetimeB);
      done();
    }, 10);
  });
});
