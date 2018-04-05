import { Command } from "./command";
import { Message } from "discord.js";
import { CommandContext } from "../models/command_context";

export class DaleCommand implements Command {
  readonly commandNames = ["dale", "lfg", "games"];
  readonly helpMessage = `Use "!dale" to find a quick game. If you specify an amount of time "!dale 1h", "!dale 35m" you'll be notified of games for that amount of time. If you want to stay notified indefinitely use "!dale 4eva" or something similar. Race conditions abound, break me at your own risk.`;

  async run(commandContext: CommandContext): Promise<void> {
    await commandContext.originalMessage.reply("Dale!");
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return true;
  }
}
