export class BashCommand {
  private readonly commands: string[];

  constructor(script?: string) {
    this.commands = script ? [script] : [];
  }

  line(script: string): BashCommand {
    this.commands.push(script);
    return this;
  }

  build(): string {
    if (this.commands.length == 1) {
      return this.commands[0];
    } else {
      return this.commands.join("\n") + "\n";
    }
  }
}

export function bash(script?: string): BashCommand {
  return new BashCommand(script);
}
