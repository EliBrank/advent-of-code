import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLineByLine() {
  const fs = createReadStream('datatest.txt');

  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  });

  let current = 50;
  let score = 0;

  for await (const line of rl) {
    console.log({ line });
  }
}

processLineByLine();
