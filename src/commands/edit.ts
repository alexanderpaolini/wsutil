import { Command } from "../structures/command";

const editSubCommands: Command[] = [];

const addSubCmd: Command = {
  name: "add",
  usage: () => "add <url/app> <name> [options]",
  run: async (wsutil, wsname, type, name, ...args) => {
    if (!type) {
      throw new Error("application type required");
    }

    const cnfg = await wsutil.configHelper.read();
    const wkspace = cnfg.workspaces.find((x) => x.name == wsname)!;

    if (type == "app") {
      if (args.length != 0) {
        throw new Error("options are not supported for 'app' type");
      }

      wkspace.cmds.push({ cmd: name, argv: [] });
    } else if (type == "url") {
      if (args.length != 0) {
        throw new Error("options are not supported for 'url' type");
      }

      wkspace.urls.push(name);
    } else {
      throw new Error(`${type} is not a valid application type`);
    }

    await wsutil.configHelper.write();

    return;
  },
};

editSubCommands.push(addSubCmd);

export const editCommand: Command = {
  name: "edit",
  usage: () => "edit <name>",
  run: async (wsutil, name, ...args) => {
    const cnfg = await wsutil.configHelper.read();

    if (!name) {
      throw new Error("workspace name required");
    }

    if (!cnfg.workspaces.find((x) => x.name == name)) {
      throw new Error("workspace not found");
    }

    const subCmdName = args[0];

    if (!subCmdName) {
      throw new Error("edit subcommand required");
    }

    const cmd = editSubCommands.find((x) => x.name == subCmdName);

    if (!cmd) {
      throw new Error("subcommand not found");
    }

    cmd.run(wsutil, name, ...args.slice(1));

    return;
  },
};
