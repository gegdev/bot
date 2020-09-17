import { Inhibitor as AkairoInhibitor, InhibitorOptions } from "discord-akairo";
import { Fire } from "../Fire";

export class Inhibitor extends AkairoInhibitor {
  client: Fire;
  constructor(id: string, options?: InhibitorOptions) {
    super(id, options);
  }

  async init() {}

  async unload() {}
}
