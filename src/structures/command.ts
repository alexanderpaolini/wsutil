import { WorkspaceUtil } from "./WorkspaceUtil";

export interface Command {
  name: string;
  usage: () => string;
  run: (wsutil: WorkspaceUtil, ...args: string[]) => void | Promise<void>;
}
