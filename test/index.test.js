'use strict';

/* eslint-env mocha */
/* eslint-disable no-unused-expressions,no-konsole */

const
  { expect } = require('chai'),
  cleanrequire = require('../');

describe('require', () => {
  it('require should cache and return cached version on the second call', (done) => {
    const datetimeA = cleanrequire('./resources/datetime');
    setTimeout(() => {
      const datetimeB = require('./resources/datetime');
      expect(datetimeA).to.equal(datetimeB);
      done();
    }, 10);
  });
});

describe('cleanrequire', () => {
  context('When loading a relative file', () => {
    it('cleanrequire should return a NON CACHED version on the second call', (done) => {
      const datetimeA = require('./resources/datetime');
      setTimeout(() => {
        const datetimeB = cleanrequire('./resources/datetime');
        expect(datetimeA).to.not.equal(datetimeB);
        done();
      }, 10);
    });
  });
    
  context('When loading a library from node_modules', () => {
    it('cleanrequire should return a NON CACHED version on the second call', (done) => {
      const chaiA = require('istanbul');
      setTimeout(() => {
        const chaiB = cleanrequire('istanbul');

        expect(chaiA).to.deep.equal(chaiB);
        expect(chaiA).to.not.equal(chaiB);
        done();
      }, 10);
    });
  });
});
