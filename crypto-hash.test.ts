import { cryptoHash } from './crypto-hash'

describe('crytoHash()', () => {
  it('generate a SHA-256 hased output', () => {
    expect(cryptoHash('foo'))
      .toEqual('0010110000100110101101000110101101101000111111111100011010001111111110011001101101000101001111000001110100110000010000010011010000010011010000100010110101110000011001001000001110111111101000001111100110001010010111101000100001100010011001101110011110101110')
  })
})

it('produces the same hash with the same input arguments in any order', () => {
  expect(cryptoHash('one', 'two', 'three'))
    .toEqual(cryptoHash('three', 'two', 'one'))
})
