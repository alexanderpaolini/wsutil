import { Command } from "../structures/command";

export const deleteCommand: Command = {
  name: "delete",
  usage: () => "delete <name>",
  run: async (wsutil, name) => {
    const cnfg = await wsutil.configHelper.read();

    if (!name) {
      throw new Error("workspace name required");
    }

    if (!cnfg.workspaces.find((x) => x.name == name)) {
      throw new Error("workspace does not exist");
    }

    process.stdout.write(`are you sure you want to delete ${name}? [y/N]: `);
    for await (const line of console) {
      if (line.toLowerCase() != "y") {
        console.log("canceled");
        return;
      }

      break;
    }

    cnfg.workspaces = cnfg.workspaces.filter((x) => x.name != name);

    await wsutil.configHelper.write();

    console.log("ok");

    return;
  },
};
