import Discord from "discord.js";
import {default as config } from "./config/config";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", () => {
  console.log("Message");
});

client.login(config.token);
