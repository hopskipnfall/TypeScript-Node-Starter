import { Message } from "discord.js";
import { DaleCommand } from "./commands/dale";
import { Command } from "./commands/command";
import { config } from "./config/config";
import { ParsedUserCommand } from "./models/parsed_user_command";

/** Handler for bot commands issued by users. */
class CommandHandler {
  commands: Command[];

  constructor() {
    const commandClasses = [
      DaleCommand,
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) {
      return;
    }

    const parsedCommand = new ParsedUserCommand(message, config.prefix);

    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(parsedCommand));
    const matchedCommand = this.commands.find(command => command.commandNames.indexOf(parsedCommand.parsedCommandName) > -1);

    if (!matchedCommand) {
      await message.reply(`I don't recognize that command. Try !help.`);
    } else if (!allowedCommands.some(command => command == matchedCommand)) {
      await message.reply(`you aren't allowed to use that command. Try !help.`);
    } else {
      await matchedCommand.run(parsedCommand);
    }
    return Promise.resolve();
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(config.prefix);
  }
}

export let commandHandler = new CommandHandler();
