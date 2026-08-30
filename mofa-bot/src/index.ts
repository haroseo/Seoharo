import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  EmbedBuilder,
  Message,
} from 'discord.js';

const required = ['DISCORD_TOKEN', 'DISCORD_GUILD_ID', 'CHANNEL_VERIFY_ID', 'CHANNEL_ADMIN_PORTAL_ID'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const config = {
  token: process.env.DISCORD_TOKEN!,
  guildId: process.env.DISCORD_GUILD_ID!,
  verifyChannelId: process.env.CHANNEL_VERIFY_ID!,
  adminPortalChannelId: process.env.CHANNEL_ADMIN_PORTAL_ID!,
  citizensRoleId: process.env.ROLE_CITIZENS_ID,
  overseasRoleId: process.env.ROLE_OVERSEAS_CITIZENS_ID,
  deleteMessages: process.env.ENABLE_MESSAGE_DELETE === 'true',
  changeNicknames: process.env.ENABLE_NICKNAME_CHANGE === 'true',
  assignRoles: process.env.ENABLE_ROLE_ASSIGNMENT === 'true',
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

function parseVerifyRequest(content: string): { kind: 'korean' | 'english' | 'invalid'; nickname?: string; discordId?: string; reason?: string } {
  const normalized = content.replace(/\r/g, '').trim();
  const korean = /로블록스\s*닉네임\s*[:：]\s*(.+)\n디스코드\s*고유id?\s*[:：]\s*(.+)\n요청\s*사유\s*[:：]\s*(.+)/is.exec(normalized);
  if (korean) return { kind: 'korean', nickname: korean[1].trim(), discordId: korean[2].trim(), reason: korean[3].trim() };
  const english = /roblox\s*nickname\s*[:：]\s*(.+)\ndiscord\s*id\s*[:：]\s*(.+)\nreason\s*for\s*request\s*[:：]\s*(.+)/is.exec(normalized);
  if (english) return { kind: 'english', nickname: english[1].trim(), discordId: english[2].trim(), reason: english[3].trim() };
  return { kind: 'invalid' };
}

function auditEmbed(message: Message, request: ReturnType<typeof parseVerifyRequest>) {
  return new EmbedBuilder()
    .setTitle('인증 신청 자동 로그')
    .setColor(request.kind === 'invalid' ? 0xd32f2f : 0x2e7d32)
    .addFields(
      { name: '신청자', value: `${message.author.tag} (${message.author.id})` },
      { name: '양식', value: request.kind === 'korean' ? '내국민' : request.kind === 'english' ? '외국인' : '불일치' },
      { name: '닉네임', value: request.nickname ?? '확인 불가' },
      { name: 'Discord ID', value: request.discordId ?? '확인 불가' },
      { name: '요청 사유', value: request.reason ?? '확인 불가' },
      { name: '원문 메시지', value: message.url },
    )
    .setTimestamp();
}

client.once(Events.ClientReady, (ready) => {
  console.log(`MOFA Bot ready as ${ready.user.tag}`);
  console.log('Safety mode:', {
    deleteMessages: config.deleteMessages,
    changeNicknames: config.changeNicknames,
    assignRoles: config.assignRoles,
  });
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || message.guildId !== config.guildId || message.channelId !== config.verifyChannelId) return;

  const request = parseVerifyRequest(message.content);
  const adminChannel = await message.guild?.channels.fetch(config.adminPortalChannelId).catch(() => null);
  if (!adminChannel?.isTextBased()) return;

  await adminChannel.send({ embeds: [auditEmbed(message, request)] });

  if (request.kind === 'invalid' || !request.nickname || !request.discordId || !request.reason) {
    await message.reply('양식이 확인되지 않았습니다. 고정된 한국어 또는 영어 양식에 맞춰 다시 요청해 주세요.');
    return;
  }

  const member = await message.guild?.members.fetch(message.author.id).catch(() => null);
  if (!member) return;

  if (config.assignRoles) {
    const roleId = request.kind === 'korean' ? config.citizensRoleId : config.overseasRoleId;
    if (roleId) await member.roles.add(roleId, 'MOFA 인증 신청 자동 승인');
  }
  if (config.changeNicknames) await member.setNickname(request.nickname, 'MOFA 인증 신청 자동 승인');
  if (config.deleteMessages) await message.delete().catch(() => undefined);
});

client.login(config.token);
