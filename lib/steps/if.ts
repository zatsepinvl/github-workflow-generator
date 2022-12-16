import { JobStep } from "../workflow";

export function onlyIf(condition: string, step: JobStep): JobStep {
  const { name, id, ...other } = step;
  return {
    name,
    id,
    if: condition,
    ...other,
  };
}
