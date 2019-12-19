const cryptoHash = require('./crypto-hash');
const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = Block.mineBlock({
            lastBlock,
            data
        });

        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];

            const actualLastHash = chain[i - 1].hash;

            const { timestamp, lastHash, hash, nonce, difficulty, data } = block;

            if (lastHash !== actualLastHash) {
                return false;
            }

            const validateHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if (hash !== validateHash) {
                return false;
            }
        }

        return true;
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid');
            return;
        }

        console.log('replacing chain with', chain)

        this.chain = chain;
    }
}

module.exports = Blockchain;
