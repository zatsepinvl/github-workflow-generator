import { JobStep } from "../workflow";

export interface YarnInstallParams {
  offline?: boolean;
  production?: boolean;
}

export interface YarnVersionParams {
  newVersion: string;
  preId: string;
}

export class Yarn {
  static install(params?: YarnInstallParams): JobStep {
    let cmd = "yaml install";
    if (params?.offline) {
      cmd += " --prefer-offline";
    }
    if (params?.production) {
      cmd += " --production";
    }
    return {
      name: "Yarn install",
      run: cmd,
    };
  }

  static build(): JobStep {
    return this.script("build");
  }

  static audit(): JobStep {
    return {
      name: "Yarn audit",
      // fail only with critical
      run: `bash -c 'yarn audit; [[ $? -ge 16 ]] && exit 1 || exit 0'`,
    };
  }

  static lint(): JobStep {
    return this.script("lint");
  }

  static test(): JobStep {
    return {
      name: "Yarn test",
      run: "yarn test",
    };
  }

  static version({ newVersion, preId }: YarnVersionParams): JobStep {
    return {
      name: "Yarn version",
      run: `yarn version --new-version ${newVersion} --preid ${preId} --no-git-tag-version`,
    };
  }

  static script(script: string): JobStep {
    return {
      name: `Yarn ${script}`,
      run: `yarn ${script}`,
    };
  }
}
