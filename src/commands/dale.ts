import { Command } from "./command";
import { Message } from "discord.js";

export class DaleCommand implements Command {
  commandNames = ["dale", "lfg", "games"];

  helpMessage = `Use "!dale" to find a quick game. If you specify an amount of time "!dale 1h", "!dale 35m" you'll be notified of games for that amount of time. If you want to stay notified indefinitely use "!dale 4eva" or something similar. Race conditions abound, break me at your own risk.`;

  async run(message: Message): Promise<boolean> {
    await message.reply("Dale!");
    return Promise.resolve(true);
  }

  hasPermissionToRun(message: Message): boolean {
    return true;
  }
}
