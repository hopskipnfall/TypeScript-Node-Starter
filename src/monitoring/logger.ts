import { TextChannel } from "discord.js";
import { client } from "../server";

class Logger {
  private static readonly alertGuildId = "432589824613154836";
  /** Map of guild ID to alerting channel. */
  private static readonly guildToAlertChannelMap: Map<string, string> = new Map([
    // jonntest
    ["411608283992817665", "432604895623774223"],
    ["261989509695012875", "432605763517808640"],
  ]);

  error(errorMessage: string, guildId: string) {
    if (!Logger.guildToAlertChannelMap.has(guildId)) {
      console.error(`${guildId} is not configured for alerts, dropping error.`);
    }
    const channel = this.getChannelForGuild(guildId);
    if (channel) {
      channel.send(errorMessage);
    }
  }

  private getChannelForGuild(guildId: string): TextChannel {
    const channelId = Logger.guildToAlertChannelMap.get(guildId);
    const alertGuild = client.guilds.find(guild => guild.id == Logger.alertGuildId);
    if (!channelId || !alertGuild) {
      return undefined;
    }
    return alertGuild.channels.find(channel => channel.id == channelId) as TextChannel;
  }
}

export const logger = new Logger();
