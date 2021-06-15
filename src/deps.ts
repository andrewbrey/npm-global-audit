import { command } from 'execa';
import { MinimalPackageJSON, NPMGlobalDeps, SupportedPackageManager } from './types';

export async function globalPackageJSON(packageManager: SupportedPackageManager) {
  const commands: Record<SupportedPackageManager, string> = {
    npm: 'npm ls -g --depth=0 --json',
  };

  const { stdout: globalDepsJSON } = await command(commands[packageManager]);
  const globalDeps = JSON.parse(globalDepsJSON) as NPMGlobalDeps;

  return Object.entries(globalDeps.dependencies).reduce(
    (minimalPackageJSON, [depName, dep]) => {
      minimalPackageJSON.dependencies[depName] = dep.version;

      return minimalPackageJSON;
    },
    { dependencies: {} } as MinimalPackageJSON
  );
}
