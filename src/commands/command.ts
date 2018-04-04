import { Message } from "discord.js";

export interface Command {
  commandNames: string[];

  helpMessage: string;

  run(message: Message): Promise<boolean>;

  hasPermissionToRun(message: Message): boolean;
}
