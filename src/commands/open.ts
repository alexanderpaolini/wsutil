import { Command } from "../structures/command";
import { $ } from "bun";

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

    await new Promise((r) => setTimeout(r, 300));

    for (const url of wkSpace.urls) {
      await $`xdg-open ${url}`;
    }

    process.exit(0);
  },
};
