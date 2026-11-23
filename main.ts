// Two Lines of Morning Light: writes the two-line micro poem to /output/entry.txt.
// Node 22, standard library only. The poem is exactly two lines about light
// arriving in the morning, written here and nowhere else.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The entrypoint's own directory, so a relative output path never depends
// on the working directory the grader runs from.
const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR)
  : '/output';

const poemLines = [
  'A blade of sun cuts the dark between the blinds;',
  'the dust in it turns, slow, and will not settle.',
];

const poem = poemLines.join('\n');

// The gate allows 1 to 120 characters; refuse to write anything else.
if (poemLines.length !== 2 || poem.length > 120 || poem.trim().length === 0) {
  throw new Error('poem must be exactly two lines and at most 120 characters');
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), poem, 'utf8');
