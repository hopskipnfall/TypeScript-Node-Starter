import { Message } from "discord.js";
import { DaleCommand } from "./commands/dale";
import { Command } from "./commands/command";
import { default as config } from "./config/config";

class CommandHandler {
  commands: Command[];

  constructor() {
    const commandClasses = [
      DaleCommand,
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
  }

  async handleMessage(message: Message): Promise<void> {

    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const userCommand = args.shift().toLowerCase();

    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(message));
    const matchedCommand = this.commands.find(command => command.commandNames.indexOf(userCommand) > -1);

    if (!matchedCommand) {
      await message.reply(`I don't recognize that command. Try !help.`);
    } else if (!allowedCommands.some(command => command == matchedCommand)) {
      await message.reply(`you aren't allowed to use that command. Try !help.`);
    } else {
      await matchedCommand.run(message);
    }
    return Promise.resolve();
  }
}

export let commandHandler = new CommandHandler();
