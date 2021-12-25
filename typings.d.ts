interface IBlock {
  timestamp: number,
  lastHash: string,
  hash: string,
  data: string[],
  nonce: number,
  difficulty: number
}
