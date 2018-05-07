import Discord, { Message } from "discord.js";
import * as challonge from "challonge";
import { config } from "./config/config";
import { CommandHandler } from "./command_handler";

const challongeClient = challonge.createClient({
  apiKey: config.challonge.apiKey,
  subdomain: undefined,
});


const commandHandler = new CommandHandler(config.prefix);

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", (message: Message) => {
  commandHandler.handleMessage(message);

  challongeClient.tournaments.create({
    tournament: {
      name: "testinggggg",
      url: "test123455e5359",
      tournamentType: "single elimination",
      description: "My test thing",
      openSignup: false,
      private: true,
      subdomain: "jonnjonnjonn",
    }, callback: (a: any, b: any) => {
      console.log(a, b);
    }
  });
});

client.on("error", e => {
  console.error("Discord client error!", e);
});

client.login(config.token);
