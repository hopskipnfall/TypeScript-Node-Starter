import { Message } from "discord.js";

/** A user-given command extracted from a message. */
export class ParsedUserCommand {
  /** Command name in all lowercase. */
  readonly parsedCommandName: string;
  /** Arguments (split by space). */
  readonly args: string[];
  /** Original Message the command was extracted from. */
  readonly originalMessage: Message;

  constructor(message: Message, prefix: string) {
    const splitMessage = message.content.slice(prefix.length).trim().split(/ +/g);

    this.parsedCommandName = splitMessage.shift().toLowerCase();
    this.args = splitMessage;
    this.originalMessage = message;
  }

  /** Extracts command args (separated by a space) from a message containing a command. */
  private getCommandArgs(message: Message): string[] {
    return ;
  }
}
