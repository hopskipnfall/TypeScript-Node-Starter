import { Command } from "./command";
import { Message, TextChannel } from "discord.js";
import { CommandContext } from "../models/command_context";
import { reactor } from "../reactions/reactor";

export class DaleCommand implements Command {
  private static readonly ALLOWED_CHANNELS = ["411608283992817667", "296163502924627970", "425039332479467521"];
  private static readonly FOREVER_ARGS = ["4eva", "forever", "infinity"];
  private static readonly DALE_ROLE_NAME = "Netplay";
  readonly commandNames = ["dale", "lfg", "games"];


  /** Map of user ID to timer. */
  private readonly pendingExpirations = new Map<string, NodeJS.Timer>();

  async run(commandContext: CommandContext): Promise<void> {
    const message = commandContext.originalMessage;
    if (!this.validateArgs(commandContext)) {
      await message.reply(`incorrect usage. ${this.getHelpMessage(commandContext.commandPrefix)}`);
      return Promise.reject("Invalid usage.");
    }

    let activeMinutes = 15;
    let activeHumanReadable = "15 minutes";

    const channel = message.channel;
    if (!(channel instanceof TextChannel)) {
      return Promise.reject("Channel is not a TextChannel");
    }
    const netplay = channel.guild.roles.find("name", DaleCommand.DALE_ROLE_NAME);
    if (!netplay) {
      return Promise.reject("Cannot find dale role.");
    }

    if (commandContext.args.length > 0) {
      const arg = commandContext.args[0];

      if (DaleCommand.FOREVER_ARGS.includes(arg)) {
        activeMinutes = 0;
        activeHumanReadable = "for eternity";
      } else if (/^\d{1,2}[m]$/.test(arg)) {
        activeMinutes = +arg.substring(0, arg.length - 1);
        activeHumanReadable = `for ${activeMinutes} minute(s)`;
      } else if (/^\d{1,2}[h]$/.test(arg)) {
        activeMinutes = +arg.substring(0, arg.length - 1) * 60;
        activeHumanReadable = `for ${activeMinutes / 60} hour(s)`;
      } else {
        return Promise.reject("Something bad happened!");
      }
    }

    await message.channel.send(`${netplay} ${message.member.displayName} is looking for games. ${message.member.displayName} will be in the Netplay role ${activeHumanReadable}.`)
        .then(message => {
          if (message instanceof Message &&  activeMinutes != 0) {
              message.delete(activeMinutes * 60 * 1000);
          }
        });
    await message.member.addRole(netplay);
    if (this.pendingExpirations.has(message.member.id)) {
      clearTimeout(this.pendingExpirations.get(message.member.id));
    }
    if (activeMinutes != 0) {
      const timeoutId = setTimeout(() => {
        message.member.removeRole(netplay);
        reactor.expired(message);
      }, activeMinutes * 60 * 1000);
      this.pendingExpirations.set(message.member.id, timeoutId);
    }
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return DaleCommand.ALLOWED_CHANNELS.includes(commandContext.originalMessage.channel.id);
  }

  getHelpMessage(commandPrefix: string): string {
    const p = commandPrefix;
    return `Use "${p}dale" to find a quick game. If you specify an amount of time "${p}dale 1h", "${p}dale 35m" you'll be notified of games for that amount of time. If you want to stay notified indefinitely use "${p}dale 4eva" or something similar.`;
  }

  private validateArgs(commandContext: CommandContext): boolean {
    if (commandContext.args.length == 0) {
      return true;
    } else if (commandContext.args.length > 1) {
      return false;
    }

    const arg = commandContext.args[0];
    if (DaleCommand.FOREVER_ARGS.includes(arg)) {
      return true;
    }

    return /^\d{1,2}[mh]$/.test(arg);
  }
}
