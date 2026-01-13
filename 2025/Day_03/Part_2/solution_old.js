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
      //     ^ 12
      const remainingBatteries = Math.min(numBatteries, bank.length - i);
      //                                  ^ 12          ^ 15 - 12 (3)
      const batteryIndexStart = numBatteries - remainingBatteries;
      //                ^ 9     ^ 12           ^ 3

      let batterySwapped = false;
      for (let j = batteryIndexStart; j < numBatteries; j++) {
      //       ^ 9                        ^ 12
        if (batterySwapped) {
          const nextBatteryIndex = batteryIndexStart + (j - batteryIndexStart);
          //    ^ 9                ^ 9                  ^ 9 - 9 (0)
          activatedBatteries[j] = bank[nextBatteryIndex];
          continue;
        }
        if (bank[i] > activatedBatteries[j]) {
          // bank[12] > activatedBatteries[9]
          //  ^ 2        ^ 2
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
