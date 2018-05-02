import { Command } from "./command";
import { Message, TextChannel } from "discord.js";
import { CommandContext } from "../models/command_context";
import { reactor } from "../reactions/reactor";

export class NodaleCommand implements Command {
  readonly commandNames = ["nodale", "undale"];

  private static readonly ALLOWED_CHANNELS = ["411608283992817667", "296163502924627970", "425039332479467521"];
  private static readonly DALE_ROLE_NAME = "Netplay";

  async run(commandContext: CommandContext): Promise<void> {
    const message = commandContext.originalMessage;

    const channel = message.channel as TextChannel;
    console.error("channel", channel.guild.roles);
    const netplay = channel.guild.roles.find("name", NodaleCommand.DALE_ROLE_NAME);
    if (!netplay) {
      return Promise.reject("Cannot find dale role.");
    }

    await message.member.removeRole(undefined);
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return NodaleCommand.ALLOWED_CHANNELS.includes(commandContext.originalMessage.channel.id);
  }

  getHelpMessage(commandPrefix: string) {
    return `use ${commandPrefix}nodale to remove yourself from the Netplay role.`;
  }
}
