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
  //  2   3   4   2   3   4   2   3   4   2   3   4   2   7   8
  //  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14

  //  2   3   4   2   3   4   2   3   4   2   3   4
  //  0   1   2   3   4   5   6   7   8   9  10  11
  for await (const line of rl) {
    const bank = line.toString();
    const activatedBatteries = [];

    // Initial battery selection
    for (let i = 0; i < numBatteries; i++) {
      activatedBatteries.push(bank[i]);
    }

    for (let i = numBatteries; i < bank.length; i++) {
      const remainingBatteries = Math.min(numBatteries, bank.length - i);
      const lastBatteryIndexToCheck = numBatteries - remainingBatteries;

      let batterySwapped = false;
      for (let j = lastBatteryIndexToCheck; j < numBatteries; j++) {
        if (batterySwapped) {
          const nextBatteryIndex = lastBatteryIndexToCheck + j;
          activatedBatteries[j] = bank[nextBatteryIndex];
          continue;
        }
        if (bank[i] > activatedBatteries[j]) {
          activatedBatteries[j] = bank[i];
          batterySwapped = true;
        }
      }
    }

    console.log('activatedBatteries:', activatedBatteries);

    // totalJoltage += max;
  }

  console.log(totalJoltage);
}

processLineByLine();
