import { Command } from "../structures/command";

export const configCommand: Command = {
  name: "config",
  usage: () => "config",
  run: async (wsutil) => {
    console.log(wsutil.configHelper.getPath());
  },
};
