import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, '.nojekyll'), '');
