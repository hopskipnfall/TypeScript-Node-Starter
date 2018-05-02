import { NodaleCommand } from "../../src/commands/nodale";
import { Message, TextChannel, Guild, Role, Collection, GuildMember } from "discord.js";
import { mock, verify, anyOfClass, anything, instance, when } from "ts-mockito";
import { CommandContext } from "../../src/models/command_context";

describe("NodaleCommand", () => {
  const command = new NodaleCommand();

  beforeEach(() => {
  });

  it("should have permission to run for recognized room", () => {
    const knownChannel = "411608283992817667";
    const message = buildMessage("!nodale", knownChannel);

    expect(command.hasPermissionToRun(new CommandContext(message, "!"))).toBe(true);
  });

  it("should not have permission to run for unrecognized room", () => {
    const unknownChannel = "i am not a known channel";
    const message = buildMessage("!nodale", unknownChannel);

    expect(command.hasPermissionToRun(new CommandContext(message, "!"))).toBe(false);
  });

  it("should remove the netplay role", () => {
    const knownChannel = "411608283992817667";
    const message = buildMessage("!nodale", knownChannel);
    // class Hey {
    //   hey: string;
    //   do(): number { return 42; }
    // }

    // const heyMock = mock(Hey);
    // when(heyMock.hey).thenReturn(100);
    // const hey: Hey = instance(heyMock);
    // expect(hey.hey).toBe(42);
    // verify(hey.do()).once();

    return command.run(new CommandContext(message, "!"))
        .catch(fail)
        .then(() => {
          verify(message.member.removeRole(undefined)).once();
        });
  });
});

const buildMessage = (content: string, channelId: string): Message => {
  const roleMock = mock(Role);
  when(roleMock.id).thenReturn("411608283992817667");
  when(roleMock.name).thenReturn("Netplay");
  const role = instance(roleMock);

  const guildMemberMock = mock(GuildMember);

  const guildMock = mock(Guild);
  when(guildMock.roles).thenReturn(new Collection<string, Role>([[role.id, role]]));

  const channelMock = mock(TextChannel);
  when(channelMock.id).thenReturn(channelId);
  when(channelMock.guild).thenReturn(instance(guildMock));

  const messageMock = mock(Message);
  when(messageMock.content).thenReturn(content);
  when(messageMock.guild).thenReturn(instance(guildMock));
  when(messageMock.channel).thenReturn(instance(channelMock));
  when(messageMock.member).thenReturn(instance(guildMemberMock));
  return instance(messageMock);
};
