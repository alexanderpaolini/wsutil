import { Command } from "../structures/command";
import { DEFAULT_WORKSPACE } from "../structures/ConfigHelper";

export const createCommand: Command = {
  name: "create",
  usage: () => "create <name>",
  run: async (wsutil, name) => {
    if (!name) {
      throw new Error("workspace name required");
    }
    const cnfg = await wsutil.configHelper.read();

    if (cnfg.workspaces.find((x) => x.name == name)) {
      throw new Error("workspace already exists");
    }

    cnfg.workspaces.push({ name, ...DEFAULT_WORKSPACE });

    await wsutil.configHelper.write();

    console.log("ok");

    return;
  },
};
