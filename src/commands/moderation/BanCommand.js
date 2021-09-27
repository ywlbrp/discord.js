const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { color, logo } = require('../../../slappey.json');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

 async run(client, message, args) {

    message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cannot use this command.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I cannot ban this user i require the \`BAN_MEMBERS\` permission.");

    const mentionedMembers = message.mentions.members.first();

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";

    if(!args[0]) return message.channel.send("You need to state a user to ban \`-ban @user reason\`");

    if(!mentionedMembers) return message.channel.send("The Member Mentioned Is Not In The Server.");
    if(!mentionedMembers.bannable) return message.channel.send("I cannot ban that member.");

    const banEmbed = new Discord.MessageEmbed()

    .setTitle(`You Were Banned From The ${message.guild.name} Discord Server`)
    .setColor(color)
    .setThumbnail(logo)
    .setDescription(`Reason: ${reason}`)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    const su6Embed = new Discord.MessageEmbed()

    .setTitle(`The User ${mentionedMembers.user.tag} Was Sucessfully Banned From The Server`)
    .setColor(color)
    .setThumbnail(logo)
    .setDescription(`reason: ${reason}`)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    await mentionedMembers.send(banEmbed).catch(err => console.log(err));
    await mentionedMembers.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(su6Embed));
  }
}