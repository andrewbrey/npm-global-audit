# NPM Global Audit

A utility to simplify (and make possible) an audit, i.e. `npm audit`, of globally installed node modules.

[![Version](https://img.shields.io/npm/v/npm-global-audit.svg)](https://npmjs.org/package/npm-global-audit)
[![Downloads/week](https://img.shields.io/npm/dw/npm-global-audit.svg)](https://npmjs.org/package/npm-global-audit)
[![License](https://img.shields.io/npm/l/npm-global-audit.svg)](https://github.com/npm-global-audit/blob/master/package.json)

## Usage

```bash
npx npm-global-audit
```

## How it works

`npm-global-audit` will determine your globally installed node modules using `npm` built in tools (`npm ls -g --depth=0`) and will then construct a minimal package.json file in your system temp directories, then use this "local" package.json as the package definition against which an audit can be performed. The audit will be performed against a package.json composed of the exact versions of node modules installed globally at the time of execution, i.e. it does not calculate any semver ranges.

## Notes

- The actual audit is performed by `yarn` (which will be executed via `npx` in the event that you do not have `yarn` installed) as the output is more human-readable. This may change or be configurable in the future.
- No node modules need to be installed locally for the audit to be performed (when `yarn` performs the audit) so your system temp dirs won't bloat up with ephemeral `node_module` installs.
- The audit only supports `npm` globally installed node modules. This may be expanded to include other package managers in the future.