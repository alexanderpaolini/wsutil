import { Command } from "../structures/command";

export const listCommand: Command = {
  name: "list",
  usage: () => "list",
  run: async (wsutil) => {
    const cnfg = await wsutil.configHelper.read();
    const wsList = cnfg.workspaces;
    const wsStr = wsList.map((x) => x.name).join("\t");

    console.log(wsStr);

    return;
  },
};
