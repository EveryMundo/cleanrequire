'use strict';

/* eslint-env mocha */
/* eslint-disable no-unused-expressions,no-konsole */

const
  { expect } = require('chai'),
  sinon      = require('sinon'),
  cleanrequire = require('../');

describe('firstMatchOrCWD', () => {
  it('shoud return Current Working Directory when input is not an Array', () => {
    const { firstMatchOrCWD } = cleanrequire;

    const res      = firstMatchOrCWD(null);
    const expected = process.cwd();
    
    expect(res).to.equal(expected);
  });
});

describe('prependSlash', () => {
  context('NOT running on windows', () => {
    it('shoud return a string prepended by a slash', () => {
      const { prependSlash } = cleanrequire;

      const input = 'C:\\path\\another-path';
      const expected = `/${input}`;
      const res = prependSlash(input);

      expect(res).to.equal(expected);
    });
  });

  context('running on windows', () => {
    const os = require('os');
    beforeEach(() => {
      sinon.stub(os, 'platform').callsFake(() => 'win32');
    });

    afterEach(() => {
      os.platform.restore();
    });

    it('shoud return the exact same string without prepending the slash', () => {
      const { prependSlash } = cleanrequire;
  
      const input = 'C:\\path\\another-path';
      const res = prependSlash(input);
  
      expect(res).to.equal(input);
    });
  });
});

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
