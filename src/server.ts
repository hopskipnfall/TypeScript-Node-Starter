import Discord, { Message } from "discord.js";
import {default as config } from "./config/config";
import { commandHandler } from "./commandhandler";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", (message: Message) => {
  commandHandler.handleMessage(message);
});

client.login(config.token);
