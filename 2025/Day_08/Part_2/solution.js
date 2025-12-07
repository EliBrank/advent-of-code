import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  const fs = createReadStream('data.txt');

  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  });

  let current = 50;
  let score = 0;

  for await (const line of rl) {
    const direction = line.slice(0, 1);
    const rawDistance = parseInt(line.slice(1,));

    // First, calc number of full rotations
    const fullRotations = Math.floor(rawDistance / 100);

    // Update score & distance to account for full rotations
    score = score + (Math.floor(rawDistance / 100));
    // e.g. 532 -> 32
    const distance = rawDistance % 100;

    const dialStartsAtZero = current === 0;

    if (direction === 'L') {
      const dialPassesZero = distance > current;

      if (dialPassesZero) {
        current = 100 - (distance - current)
        if (!dialStartsAtZero) score++;
      } else {
        current = current - distance;
      }

      console.log('moved to the left by:', distance);

    } else {
      const dialPassesZero = current + distance > 100;

      if (dialPassesZero && !dialStartsAtZero) score++;
      current = (current + distance) % 100;

      console.log('moved to the right by:', distance);

    }

    if (current === 0) score++;

    console.log('current:', current);
    console.log('current score:', score);
    console.log();
  }
}

processLineByLine();
