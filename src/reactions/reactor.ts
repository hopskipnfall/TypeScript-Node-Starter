import { Message } from "discord.js";

const ACK_REACTIONS = ["👍", "🎮", "💚", "🍜"];
const FAILURE_REACTIONS = ["⛔", "🚱"];

export class Reactor {
  async ack(message: Message) {
    return message.react(this.getRandom(ACK_REACTIONS));
  }

  async failure(message: Message) {
    return message.react(this.getRandom(FAILURE_REACTIONS));
  }

  /** Gets a random element of an array. */
  private getRandom(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export let reactor = new Reactor();
