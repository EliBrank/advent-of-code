import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  const fs = createReadStream('../data.txt');

  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  });

  let totalJoltage = 0;

  for await (const line of rl) {
    const bank = line.toString();
    let l = 0;
    let r = 1;
    for (let i = 1; i < bank.length; i++) {
      if (bank[i] > bank[r]) {
        r = i;
      }
      if (bank[r] > bank[l] && i < (bank.length - 1)) {
        l = r;
        r++;
      }
    }

    const max = parseInt(bank[l] + bank[r]);
    console.log('max for this bank:', max);

    totalJoltage += max;
  }

  console.log(totalJoltage);
}

processLineByLine();
