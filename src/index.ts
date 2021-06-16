#!/usr/bin/env node

import { command } from 'execa';
import { globalPackageJSON } from './deps';
import { createTempLocations, saveMinimalPackageJSON } from './fs';

async function main() {
  try {
    const temps = await createTempLocations();
    const packageJSON = await globalPackageJSON('npm');
    await saveMinimalPackageJSON(temps.packageJSON, packageJSON);
    await command('npx yarn audit -y', { stdio: 'inherit', cwd: temps.tmpDir });
  } catch (error) {
    console.error(
      `A module audit found issues. The error level mask was [${error?.exitCode}] - See https://classic.yarnpkg.com/en/docs/cli/audit/#toc-yarn-audit for more.`
    );
  }
}

main().catch((e) => console.error('An unexpected error occurred while attempting an audit of global node modules.', e));
