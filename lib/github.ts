export function expr(value: string): string {
  return `$\{{ ${value} }}`;
}

export function isTrue(expr: string): string {
  return `${expr} == 'true'`;
}

export function and(left: string, right: string): string {
  return `${left} && ${right}`;
}

export function setEnv(name: string, value: string): string {
  return `echo "${name}=${value}" >> $GITHUB_ENV`;
}

export function setEnvFromInputsOrDefault(name: string, defaultValue: string): string {
  return setEnv("name", expr(`github.event.inputs.${name} || '${defaultValue}'`));
}

export function env(name: string): string {
  return expr(`env.${name}`);
}

export function secret(name: string): string {
  return expr(`secrets.${name}`);
}
