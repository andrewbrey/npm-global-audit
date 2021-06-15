export type SupportedPackageManager = 'npm';

export interface NPMGlobalDep {
  version: string;
}

export interface NPMGlobalDeps {
  dependencies: Record<string, NPMGlobalDep>;
}

export interface MinimalPackageJSON {
  dependencies: Record<string, string>;
}

export interface TempLocations {
  tmpDir: string;
  packageJSON: string;
}
