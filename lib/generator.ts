import YAML from "yaml";
import { Workflow } from "./workflow";
import fs, { PathOrFileDescriptor } from "fs";

const DEFAULT_LINE_WIDTH = 1000;
const DEFAULT_HEADER_COMMENT = `# This is auto generate file. Do not edit.`;

export interface WorkflowGenerationOptions {
  outputPath: PathOrFileDescriptor;
  lineWidth?: number;
  headerComment?: string;
}

export class GithubWorkflow {
  static generate(workflow: Workflow, options: WorkflowGenerationOptions): void {
    const yaml = YAML.stringify(workflow, {
      blockQuote: "literal",
      lineWidth: options.lineWidth || DEFAULT_LINE_WIDTH,
      doubleQuotedAsJSON: true,
    });
    const comment = options.headerComment || DEFAULT_HEADER_COMMENT;
    const finalYaml = `${comment}\n${yaml}`;
    fs.writeFileSync(options.outputPath, finalYaml);
  }
}
