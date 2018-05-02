import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import { BracketCommand } from "./bracket";

export class SetBracketCommand implements Command {
  readonly commandNames = ["setbracket"];

  private static readonly ALLOWED_GUILD = "261989509695012875";

  async run(commandContext: CommandContext): Promise<void> {
    if (commandContext.args.length != 1) {
      await commandContext.originalMessage.reply(`incorrect usage. ${this.getHelpMessage(commandContext.commandPrefix)}`);
      return Promise.reject("Invalid usage.");
    }

    BracketCommand.bracketUrl = commandContext.args[0];
  }

  getHelpMessage(commandPrefix: string): string {
    return `use ${commandPrefix}setbracket www.bracket.url to set the bracket.`;
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return commandContext.originalMessage.guild.id == SetBracketCommand.ALLOWED_GUILD &&
        commandContext.originalMessage.member.roles.some(role => role.name == "bot-boss");
  }
}
