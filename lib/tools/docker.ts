import { JobStep } from "../workflow";

export interface DockerBuildParams {
  name: string;
}

export class Docker {
  static build({ name }: DockerBuildParams): JobStep {
    return {
      name: "Docker build",
      run: `docker build -t ${name} .`,
    };
  }
}
