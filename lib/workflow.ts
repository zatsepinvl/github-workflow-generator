export interface Workflow {
  name: string;
  env?: Record<string, string>;
  on?: WorkflowOn;
  jobs: Record<string, Job>;
}

export interface WorkflowOn {
  workflow_dispatch?: WorkflowDispatch;
  push?: Push;
}

export interface WorkflowDispatch {
  inputs?: Record<string, WorkflowDispatchInput>;
}

export interface WorkflowDispatchInput {
  type: "choice" | "boolean";
  options?: string[];
  default: unknown;
  description: string;
  required: boolean;
}

export interface Push {
  branches?: string[];
  "tags-ignore"?: string[];
}

export interface Job {
  "runs-on": string;
  "timeout-minutes"?: number;
  if?: string;
  steps: JobStep[];
}

export interface JobStep {
  name: string;
  if?: string;
  id?: string;
  run?: string;
  uses?: string;
  with?: Record<string, unknown>;
}
