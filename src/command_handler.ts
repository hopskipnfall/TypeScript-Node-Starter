import { Message } from "discord.js";
import { DaleCommand } from "./commands/dale";
import { Command } from "./commands/command";
import { config } from "./config/config";
import { CommandContext } from "./models/command_context";
import { HelpCommand } from "./commands/help";
import { reactor } from "./reactions/reactor";

/** Handler for bot commands issued by users. */
class CommandHandler {
  commands: Command[];

  constructor() {
    const commandClasses = [
      DaleCommand,
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.commands.push(new HelpCommand(this.commands));
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) {
      return;
    }

    const commandContext = new CommandContext(message, config.prefix);

    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
    const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.parsedCommandName));

    if (!matchedCommand) {
      await message.reply(`I don't recognize that command. Try !help.`);
      await reactor.failure(message);
    } else if (!allowedCommands.includes(matchedCommand)) {
      await message.reply(`you aren't allowed to use that command. Try !help.`);
      await reactor.failure(message);
    } else {
      await matchedCommand.run(commandContext).then(() => {
          reactor.success(message);
        }).catch(reason => {
          reactor.failure(message);
        });
    }
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(config.prefix);
  }
}

export let commandHandler = new CommandHandler();
