import Discord, { Message } from "discord.js";
import { config } from "./config/config";
import { CommandHandler } from "./command_handler";

const commandHandler = new CommandHandler(config.prefix);

export const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", (message: Message) => {
  commandHandler.handleMessage(message);
});

client.on("error", e => {
  console.error("Discord client error!", e);
});

client.login(config.token);
