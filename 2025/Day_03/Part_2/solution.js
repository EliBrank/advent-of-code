import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  const fs = createReadStream('../datatest.txt');

  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  });

  const numBatteries = 12;
  let totalJoltage = 0;
  // 8889
  //
  //  8   1   8   1   8   1   9   1   1   1   1   2   1   1   1
  //  l           r                                            
  //  8   1   1   1   1   1   1   1   1   1   1   1   1   1   9
  //  2   3   4   2   3   4   2   3   4   2   3   4   2   7   8
  //
  //  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14
  for await (const line of rl) {
    const bank = line.toString();
    const selection = [];

    let left = 0;
    // 3 = 15 - 12
    let searchLength = bank.length - numBatteries;

    // Loop through range to find largest value for next selection entry
    while (selection.length < numBatteries) {

      // 4 = 0 + 3 + 1
      const right = left + searchLength + 1;
      const currentRange = bank.slice(left, right);
      let indexOfMax = left;
      for (let i = left; i < right; i++) {
        if (bank[i] > bank[indexOfMax]) indexOfMax = i;
      }

      selection.push(bank[indexOfMax]);
      left = indexOfMax + 1;
      searchLength--;
    }

    console.log({ selection });
  }

  console.log(totalJoltage);
}

processLineByLine();
