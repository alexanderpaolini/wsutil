import { Command } from "./command";
import { ConfigHelper } from "./ConfigHelper";

interface WorkspaceUtilOptions {
  config?: string;
}

export class WorkspaceUtil {
  public configHelper: ConfigHelper;

  constructor(opts: WorkspaceUtilOptions) {
    this.configHelper = new ConfigHelper(opts.config);
  }

  public cmds: Command[] = [];

  public run(...args: string[]) {
    if (args.length == 0) {
      throw new Error(`expected command name`);
    }

    let cmdName = args[0];
    let cmd = this.cmds.find((x) => x.name == cmdName);

    if (cmd == undefined) throw new Error(`command ${cmdName} not found`);

    cmd.run(this, ...args.slice(1));
  }

  public addCmd(cmd: Command) {
    this.cmds.push(cmd);
  }
}
