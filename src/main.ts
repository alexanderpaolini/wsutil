import { parseArgs } from "util";
import { WorkspaceUtil } from "./structures/WorkspaceUtil";
import { listCommand } from "./commands/list";
import { createCommand } from "./commands/create";
import { deleteCommand } from "./commands/delete";
import { openCommand } from "./commands/open";
import { configCommand } from "./commands/config";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    help: { type: "boolean" },
    config: { type: "string" },
  },
  strict: true,
  allowPositionals: true,
});

const wsutil = new WorkspaceUtil({
  config: values.config,
});

wsutil.addCmd(configCommand);
wsutil.addCmd(createCommand);
wsutil.addCmd(deleteCommand);
wsutil.addCmd(listCommand);
wsutil.addCmd(openCommand);

if (values.help) {
  console.log("wsutil - A modern workspace utility application.");

  console.log();
  console.log("Options:");
  for (const cmd of wsutil.cmds) {
    console.log("\t" + cmd.usage());
  }
  console.log();

  console.log("Flags:");
  console.log("\t--help");
  console.log("\tShow this menu!");
  console.log();
  console.log("\t--config <path>");
  console.log("\tSpecify a custom config file path.");

  console.log();
  console.log("made with 🫀");

  process.exit(0);
}

try {
  await wsutil.run(...positionals.slice(2));
} catch (err) {
  console.error(err.toString());
  console.error("\tuse 'wsutil --help' for more info");
}
