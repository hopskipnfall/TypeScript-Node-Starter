import { Message } from "discord.js";
import { ParsedUserCommand } from "../models/parsed_user_command";

export interface Command {
  commandNames: string[];

  helpMessage: string;

  run(parsedUserCommand: ParsedUserCommand): Promise<boolean>;

  hasPermissionToRun(parsedUserCommand: ParsedUserCommand): boolean;
}
