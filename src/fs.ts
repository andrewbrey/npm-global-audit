import { ensureDir, realpath, writeJSON } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { MinimalPackageJSON, TempLocations } from './types';

export async function createTempLocations() {
  const tempDirectory = `${join(await realpath(tmpdir()), 'npm-global-audit', `audit-${Date.now()}`)}`;
  await ensureDir(tempDirectory);

  return { tmpDir: tempDirectory, packageJSON: join(tempDirectory, 'package.json') } as TempLocations;
}

export async function saveMinimalPackageJSON(path: string, packageJSON: MinimalPackageJSON) {
  await writeJSON(path, { license: 'UNLICENSED', ...packageJSON }, { encoding: 'utf8', spaces: 2 });
}
