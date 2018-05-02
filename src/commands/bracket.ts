import { Command } from "./command";
import { CommandContext } from "../models/command_context";

export class BracketCommand implements Command {
  static bracketUrl: string;

  readonly commandNames = ["bracket"];

  private static readonly ALLOWED_GUILD = "261989509695012875";

  async run(commandContext: CommandContext): Promise<void> {
    if (BracketCommand.bracketUrl) {
      await commandContext.originalMessage.reply(BracketCommand.bracketUrl);
    } else {
      await commandContext.originalMessage.reply(`nobody told me about the bracket :(`);
    }
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return commandContext.originalMessage.guild.id == BracketCommand.ALLOWED_GUILD;
  }

  getHelpMessage(commandPrefix: string): string {
    return `use ${commandPrefix}bracket to get the most recent bracket link.`;
  }
}
