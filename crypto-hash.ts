import crypto from 'crypto';
import hexToBinary from 'hex-to-binary';

export const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(inputs.sort().join(' '));

  return hexToBinary(hash.digest('hex'));
};
