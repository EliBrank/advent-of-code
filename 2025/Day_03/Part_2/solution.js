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
    const activatedBatteries = [];
    for (let i = 0; i < bank.length; i++) {

    }

    const max = parseInt(bank[l] + bank[r]);
    console.log('max for this bank:', max);

    totalJoltage += max;
  }

  console.log(totalJoltage);
}

processLineByLine();
