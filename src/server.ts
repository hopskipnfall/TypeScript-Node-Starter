import Discord, { Message } from "discord.js";
import { config } from "./config/config";
import { commandHandler } from "./command_handler";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", (message: Message) => {
  commandHandler.handleMessage(message);
});

client.login(config.token);
