export function* lfsr(polynomial: number): Generator<number> {
  const registerSize = Math.floor(Math.log2(polynomial));

  const seed = 1;

  let register = seed;

  while (true) {
    let feedback = 0;
    for (let i = 0; i < registerSize; i++) {
      if (polynomial & (1 << i)) {
        feedback ^= (register >> i) & 1;
      }
    }

    register = (register >> 1) | (feedback << (registerSize - 1));
    yield register & 1;
  }
}
