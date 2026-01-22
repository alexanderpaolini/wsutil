import { homedir } from "os";

interface CmdConfig {
  cmd: string;
  argv: string[];
}

interface Workspace {
  name: string;
  props: {
    dir?: string;
  };
  urls: string[];
  cmds: CmdConfig[];
}

interface WSUConfig {
  version: number;
  workspaces: Workspace[];
}

const DEFAULT_CONFIG: WSUConfig = {
  version: 1,
  workspaces: [],
};

export const DEFAULT_WORKSPACE: Omit<Workspace, "name"> = {
  props: {},
  urls: [],
  cmds: [],
};

export class ConfigHelper {
  data: WSUConfig = DEFAULT_CONFIG;

  constructor(private path: string = `${homedir()}/.config/.wsutil.json`) {
    // replace ~ with homedir() in case someone passes it by default in case this is needed
    this.path = this.path.replace(/^~(?=$|\/|\\)/, homedir());
  }

  async read(): Promise<WSUConfig> {
    try {
      const text = await Bun.file(this.path).text();
      this.data = JSON.parse(text);
      return this.data;
    } catch {
      await this.writeDefault();
      return this.data;
    }
  }

  async writeDefault() {
    try {
      await Bun.write(
        Bun.file(this.path),
        JSON.stringify(DEFAULT_CONFIG, null, 2),
      );
      this.data = DEFAULT_CONFIG;
    } catch (err) {
      throw new Error("error writing default config");
    }
  }

  async write() {
    try {
      await Bun.write(Bun.file(this.path), JSON.stringify(this.data, null, 2));
    } catch (err) {
      throw new Error("error writing config file");
    }
  }

  /**
   * In the future, this would be a nice feature to have.
   * TODO: do this feature
   */
  verify() {
    return true;
  }
}
