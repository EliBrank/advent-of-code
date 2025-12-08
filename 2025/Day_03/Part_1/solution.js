import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  const fs = createReadStream('../datatest.txt');

  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  });

  let totalJoltage = 0;

  for await (const line of rl) {
    const bank = line.toString();
    let max = parseInt(bank[0] + bank[1]);
    for (let i = 0; i < bank.length - 1; i++) {
      const current = parseInt(bank[i] + bank[i + 1]);

      max = Math.max(current, max);
    }
    console.log('max for this bank:', max);

    totalJoltage += max;
  }

  console.log(totalJoltage);
}

processLineByLine();
