# NPM Global Audit

A utility to simplify (and make possible) an audit, i.e. `npm audit`, of globally installed node modules.

[![Version](https://img.shields.io/npm/v/npm-global-audit.svg)](https://npmjs.org/package/npm-global-audit)
[![Downloads/week](https://img.shields.io/npm/dw/npm-global-audit.svg)](https://npmjs.org/package/npm-global-audit)
[![License](https://img.shields.io/npm/l/npm-global-audit.svg)](https://github.com/npm-global-audit/blob/master/package.json)

## Usage

```bash
npx npm-global-audit

# or, if you prefer to use npm instead of yarn to perform the actual audit

npx npm-global-audit --auditor npm
```

## How it works

`npm-global-audit` will determine your globally installed node modules using `npm` built in tools (`npm ls -g --depth=0`) and will then construct a minimal package.json file in your system temp directories, then use this "local" package.json as the package definition against which an audit can be performed. The audit will be performed against a package.json composed of the exact versions of node modules installed globally at the time of execution, i.e. it does not calculate any semver ranges.

## Notes

- By default the actual audit is performed by `yarn` (which will be executed via `npx` in the event that you do not have `yarn` installed) as the output is more human-readable. You can use `npm` instead if you prefer by passing the `-a` / `--auditor` option.
- Your node modules need to be installed locally so that a lockfile can be generated which is needed to perform the audit (this is not strictly true when the auditor is yarn, but to keep the logic of this utility simple, it performs the install anyway). To ensure that your system temp dirs won't bloat up with ephemeral `node_module` installs the script will remove the installed "local" packages when the audit is complete, but will not remove the generated `package.json` or any relevant lockfiles.
- The audit only supports `npm` globally installed node modules. This may be expanded to include other package managers in the future.
