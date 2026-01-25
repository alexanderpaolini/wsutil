import { Command } from "../structures/command";

export const openCommand: Command = {
  name: "open",
  usage: () => "open <name>",
  run: async (wsutil, name) => {
    if (!name) {
      throw new Error("workspace name required");
    }

    const cnfg = await wsutil.configHelper.read();
    const wkSpace = cnfg.workspaces.find((x) => x.name == name);

    if (!wkSpace) {
      throw new Error(`workspace ${name} not found`);
    }

    for (const cmd of wkSpace.cmds) {
      Bun.spawn({
        cmd: [cmd.cmd, ...cmd.argv],
        detached: true,
      });
    }

    process.exit(0);
  },
};
