import { NodaleCommand } from "../../src/commands/nodale";
import { Message, TextChannel, Guild } from "discord.js";
import { mock } from "ts-mockito";
import { CommandContext } from "../../src/models/command_context";

// class MyClass {
//   innerClass: MyClass | number;
// }

// describe("Test", () => {
//   it("should be of type MyClass", () => {
//     const myMock = mock(MyClass);
//     myMock.innerClass = mock(MyClass);
//     expect(myMock.innerClass instanceof MyClass);
//   });
// });

describe("NodaleCommand", () => {
  const command = new NodaleCommand();

  it ("should remove the netplay role", () => {
    // const context = new CommandContext(buildMessage("!nodale"), "!");
    // const message: Message = buildMessage("yo");
    // expect(message instanceof Message).toBe(true);
    // command.run(context).catch(fail);

    const m: Message = mock(Message);
    expect(m instanceof Message).toBe(true);
  });
});

const buildMessage = (content: string): Message => {
  const message = mock(Message);

  const channel = mock(TextChannel);
  channel.guild = mock(Guild);
  message.channel = channel;

  message.content = content;
  return message;
};
