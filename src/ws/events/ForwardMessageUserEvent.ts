import { EventType } from "@fire/lib/ws/util/constants";
import { FireUser } from "@fire/lib/extensions/user";
import { Event } from "@fire/lib/ws/event/Event";
import { Manager } from "@fire/lib/Manager";
import { Snowflake } from "discord.js";

export default class ForwardMessageUserEvent extends Event {
  constructor(manager: Manager) {
    super(manager, EventType.FORWARD_MESSAGE_USER);
  }

  async run(data: { user: Snowflake; message: string; args: any[] }) {
    const user = (await this.manager.client.users
      .fetch(data.user)
      .catch(() => {})) as FireUser;
    if (!user) return;

    const language = user.language;
    const defaultLang = this.manager.client.getLanguage("en-US");
    if (language.has(data.message) || defaultLang.has(data.message)) {
      const message = language.get(data.message, ...data.args);
      if (typeof message == "string")
        return await user.send({ content: message }).catch(() => {});
    } else return await user.send({ content: data.message }).catch(() => {});
  }
}
