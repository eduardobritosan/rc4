import 'mocha';
import { expect } from 'chai';
import { ksa } from '../src/main';

describe('state vector size test', () => {
  it('initializes state vector with seed {2,5} and original text {1,34}',
    () => {
      expect(ksa([2.5], [], [])).to.be.an('array');
    });
});
