import { JobStep } from "../workflow";

export interface SetupNodeParams {
  version?: number;
  cache?: "npm" | "yarn";
}

export class NodeJs {
  static setup(params?: SetupNodeParams): JobStep {
    const step: JobStep = {
      name: "Setup Nodejs",
      uses: "actions/setup-node@v3",
      with: {
        "node-version": params?.version || "18",
      },
    };
    if (params?.cache) {
      step.with.cache = params?.cache;
    }
    return step;
  }
}
