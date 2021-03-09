/**
 * Initializes the state vector
 * @param seed The seed that ciphers the original sequence
 * @param stateVector The intermediate state vector
 * @param keyVector The vector which holds the key
 */
export function ksa(seed: number[], stateVector: number[],
  keyVector: number[]): number[] {
  for (let i: number = 0; i < 256; i++) {
    stateVector[i] = i;
    keyVector[i] = seed[i % seed.length];
  }
  let j: number = 0;
  for (let i: number = 0; i < 256; i++) {
    j = ((j + stateVector[i] + keyVector[i]) % 256);
    swap(stateVector, i, j);
  }
  return stateVector;
}

/**
 * Pseudo-random generation algorithm
 * @param seed Seed
 * @param stateVector State vector
 * @param originalMessageLength Length of the original message
 * @param keystream Cyphering sequence
 */
export function prga(seed: number[], stateVector: number[],
  originalMessageLength: number, keystream: number[]) {
  let i: number = 0;
  let j: number = 0;
  let t: number;
  for (let k: number = 0; k < originalMessageLength; k++) {
    i = ((i + 1) % 256);
    j = ((j + stateVector[i]) % 256);
    swap(stateVector, i, j);
    t = ((stateVector[i] + stateVector[j]) % 256);
    keystream[k] = stateVector[t];
    keystream.splice(k, 1, stateVector[t]);
  }
  return keystream;
}

/**
 * Swaps the position of two elements in an array.
 * @param vector The array in question.
 * @param positionA The starting position of the element to be swapped.
 * @param positionB The ending position of the element to be swapped.
 */
export function swap(vector: number[], positionA: number,
  positionB: number): number[] {
  [vector[positionA], vector[positionB]] =
    [vector[positionB], vector[positionA]];
  return vector;
}

/**
 * XORs two arrays
 * @param originalMessageM Original message
 * @param keystream Keystream
 * @param cipheredMessageC Ciphered message to be returned
 */
export function xorTwoArrays(originalMessageM: number[],
  keystream: number[], cipheredMessageC: number[]): number[] {
  if (originalMessageM.length == keystream.length) {

    for (let i: number = 0; i < originalMessageM.length; i++) {
      cipheredMessageC[i] = originalMessageM[i] ^ keystream[i];
    }
  }
  return cipheredMessageC;
}

/**
 * Prints as expected from the assignment
 * @param secuenciaCifrante The keystream
 * @param textoOriginal The original message
 * @param textoCifrado The encrypted message
 */
export function salidaPractica(secuenciaCifrante: number[],
  textoOriginal: number[], textoCifrado: number[]) {
  for (let i: number = 0; i < secuenciaCifrante.length; i++) {
    console.log(
      `Byte ${(i + 1)} de la secuencia cifrante: ${secuenciaCifrante[i]}`);
    console.log(
      `Byte ${(i + 1)} del texto original: ${textoOriginal[i]}`);
    console.log(
      `Byte ${(i + 1)} del texto cifrado: ${textoCifrado[i]}`);
  }
}

const seed: number[] = [2, 5];
const originalMessage: number[] = [1, 34];
const stateVector: number[] = ksa(seed, [], []);
const keystream: number[] =
  prga(seed, stateVector, originalMessage.length, []);

let cipheredMessage: number[];

cipheredMessage = xorTwoArrays(originalMessage, keystream, []);

salidaPractica(keystream, originalMessage, cipheredMessage);
