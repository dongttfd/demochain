import { cryptoHash } from './crypto-hash'
import { GENESIS_DATA, MINE_RATE } from './config'

export class Block implements IBlock {
  constructor(
    public timestamp: number,
    public lastHash: string,
    public hash: string,
    public data: string[],
    public nonce: number,
    public difficulty: number
  ) { }

  static genesis() {
    return new this(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.lastHash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data,
      GENESIS_DATA.nonce,
      GENESIS_DATA.difficulty
    )
  }

  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash

    let hash, timestamp
    let nonce = 0
    let { difficulty } = lastBlock

    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)

      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this(
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    )
  }

  static adjustDifficulty(originalBlock: Block, timestamp: number = null) {
    const { difficulty } = originalBlock

    if (difficulty < 1) {
      return 1
    }

    if (timestamp - originalBlock.timestamp > MINE_RATE) {
      return difficulty - 1
    }

    return difficulty + 1
  }
}
