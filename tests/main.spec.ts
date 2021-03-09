import 'mocha';
import { expect } from 'chai';
import { ksa, swap, prga } from '../src/main';

describe('state vector size test', () => {
  it('initializes state vector with seed {2,5} and original text {1,34}',
    () => {
      expect(ksa([2, 5], [], [])).to.be.an('array');
    });
});

describe('swap', () => {
  it('[1, 2] becomes [2, 1]',
    () => {
      expect(swap([1, 2], 0, 1)).to.be.an('array');
    });
});

describe('prga tests', () => {
  it('prga returns an array',
    () => {
      expect(prga([2, 5], ksa([2, 5], [], []), 2, [])).to.be.an('array');
    });
});


