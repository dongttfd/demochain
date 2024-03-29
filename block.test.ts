import { cryptoHash } from './crypto-hash'
import { GENESIS_DATA, MINE_RATE } from './config'
import { Block } from './block'

describe('Block', () => {
  const timestamp = 2000
  const lastHash = 'foo-lastHash'
  const hash = 'foo-hash'
  const data = ['blockchain', 'data']
  const nonce = 1
  const difficulty = 1

  const block = new Block(
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty
  )

  it('has a timestamp, lastHash, hash and data', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.data).toEqual(data)
    expect(block.hash).toEqual(hash)
    expect(block.nonce).toEqual(nonce)
    expect(block.difficulty).toEqual(difficulty)
  })

  describe('genesis()', () => {
    const genesisBlock = Block.genesis()

    it('return a Block instancce', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })

    it('return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA)
    })
  })

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis()
    const data = 'mined data'

    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })

    it('sets the `lastHash` to the `hash` of lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data)
    })

    it('set a `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined)
    })

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash)
        .toEqual(
          cryptoHash(
            minedBlock.timestamp,
            minedBlock.nonce,
            minedBlock.difficulty,
            lastBlock.hash,
            data
          )
        )
    })

    it('set a `hash` that matches the difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty))
        .toEqual('0'.repeat(minedBlock.difficulty))
    })

    it('adjusts the difficulty', () => {
      const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1]

      expect(possibleResults.includes(minedBlock.difficulty)).toBe(true)
    })
  })

  describe('adjustDifficulty()', () => {
    it('raises the difficulty for a quickly mined block', () => {
      expect(Block.adjustDifficulty(
        block,
        block.timestamp + MINE_RATE - 100
      )).toEqual(block.difficulty + 1)
    })

    it('lowers the difficulty for a slowly mined block', () => {
      expect(Block.adjustDifficulty(
        block,
        block.timestamp + MINE_RATE + 100
      )).toEqual(block.difficulty - 1)
    })

    it('has a lower litmit of 1', () => {
      block.difficulty = -1

      expect(Block.adjustDifficulty(block)).toEqual(1)
    })
  })
})
