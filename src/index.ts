import { Command, flags } from '@oclif/command';
import { command } from 'execa';
import { globalPackageJSON } from './deps';
import { createTempLocations, saveMinimalPackageJSON } from './fs';

class Audit extends Command {
  static description = 'perform an audit of globally installed node_modules';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [];

  async run() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { args, flags } = this.parse(Audit);

    try {
      const temps = await createTempLocations();
      const packageJSON = await globalPackageJSON('npm');
      await saveMinimalPackageJSON(temps.packageJSON, packageJSON);
      await command('npx yarn audit -y', { stdio: 'inherit', cwd: temps.tmpDir });
    } catch (error) {
      this.log(
        `A module audit found issues. The error level mask was [${error?.exitCode}] - See https://classic.yarnpkg.com/en/docs/cli/audit/#toc-yarn-audit for more.`
      );

      this.exit(1);
    }
  }
}

export = Audit;
