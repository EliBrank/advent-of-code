import { readFile } from 'fs/promises';

async function loadData() {
  try {
    const data = await readFile('../data.json', 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('error reading JSON data:', err);
    throw err;
  }
}

function areDigitsDoubled(numAsString, numDigits) {
  const pattern = numAsString.slice(0, Math.ceil(numDigits / 2));
  if (numAsString === pattern + pattern) {
    return true;
  } else {
    return false;
  }
}

function getNextEvenValidNum(numAsString, numDigits) {
  const nextEvenDigitNum = 10 ** numDigits;
  const nextEvenDigitNumAsString = nextEvenDigitNum.toString();

  const nextTargetPattern = nextEvenDigitNumAsString.slice(0, Math.ceil(numDigits / 2));
  const nextTarget = parseInt(nextTargetPattern + nextTargetPattern);

  return nextTarget;
}

function getNextValidNum(numAsString, numDigits) {
  const currentTargetPattern = numAsString.slice(0, Math.ceil(numDigits / 2));
  const currentTarget = currentTargetPattern + currentTargetPattern;
  if (numAsString !== currentTarget && parseInt(currentTarget) > parseInt(numAsString)) {
    return parseInt(currentTarget);
  }
  const nextTargetPattern = (parseInt(currentTargetPattern) + 1).toString();
  const nextTargetNumDigits = currentTargetPattern.length + nextTargetPattern.length;
  if (nextTargetNumDigits % 2 !== 0) {
    return getNextEvenValidNum(numAsString, nextTargetNumDigits);
  }

  const nextTarget = parseInt(nextTargetPattern + nextTargetPattern);

  return nextTarget;
}

async function main() {
  const data = await loadData();

  let invalidIDsTotal = 0;

  for (const interval of data) {
    let current = interval[0];
    const end = interval[1];

    while (current <= end) {
      const currentAsString = current.toString();
      const numDigits = currentAsString.length;

      if (numDigits % 2 !== 0) {
        current = getNextEvenValidNum(currentAsString, numDigits);
        continue;
      }

      if (areDigitsDoubled(currentAsString, numDigits)) {
        invalidIDsTotal = invalidIDsTotal + current;
      }

      current = getNextValidNum(currentAsString, numDigits);
    }
  }

  console.log(invalidIDsTotal);
}

main();
