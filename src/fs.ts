import { emptyDir, ensureDir, pathExists, realpath, rmdir, writeJSON } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { MinimalPackageJSON, TempLocations } from './types';

const executionTimestamp = Date.now();

async function tmpDirRealPath() {
  return `${join(await realpath(tmpdir()), 'npm-global-audit', `audit-${executionTimestamp}`)}`;
}

export async function createTempLocations() {
  const tempDirectory = await tmpDirRealPath();
  await ensureDir(tempDirectory);

  return { tmpDir: tempDirectory, packageJSON: join(tempDirectory, 'package.json') } as TempLocations;
}

export async function saveMinimalPackageJSON(path: string, packageJSON: MinimalPackageJSON) {
  await writeJSON(path, { license: 'UNLICENSED', ...packageJSON }, { encoding: 'utf8', spaces: 2 });
}

export async function pruneTempLocation() {
  const tmpInstallDir = join(await tmpDirRealPath(), 'node_modules');
  if (await pathExists(tmpInstallDir)) {
    await emptyDir(tmpInstallDir);
    await rmdir(tmpInstallDir);
  }
}
