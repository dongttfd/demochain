const MINE_RATE = 1000

const INITIAL_DIFFICULTY = 3

const GENESIS_DATA: IBlock = {
  timestamp: 1,
  lastHash: '-------',
  hash: 'hash-one',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: []
}

export { GENESIS_DATA, MINE_RATE }
