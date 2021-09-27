const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { color, logo } = require('../../../slappey.json');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

 async run(client, message, args) {

    message.delete();

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command.");
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I cannot kick this user i require the \`KICK_MEMBERS\` permission.");

    const mentionedMembers = message.mentions.members.first();

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";

    if(!args[0]) return message.channel.send("You need to state a user to kick \`-kick @user reason\`");

    if(!mentionedMembers) return message.channel.send("The Member Mentioned Is Not In The Server.");
    if(!mentionedMembers.kickable) return message.channel.send("I cannot kick that member.");

    const kickEmbed = new Discord.MessageEmbed()

    .setTitle(`You Were Kicked From The ${message.guild.name} Discord Server`)
    .setColor(color)
    .setThumbnail(logo)
    .setDescription(`Reason: ${reason}`)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    const su6Embed = new Discord.MessageEmbed()

    .setTitle(`The User ${mentionedMembers.user.tag} Was Sucessfully Kicked From The Server`)
    .setColor(color)
    .setThumbnail(logo)
    .setDescription(`reason: ${reason}`)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    try {
      await mentionedMembers.send(kickEmbed);
    } catch (err) {
      console.log(`I was unable to message the member.`);
    }

    try {
      await mentionedMembers.kick(reason);
      message.channel.send(su6Embed);
    } catch (err) {
      console.log(err);
      return message.channel.send("I was unable to kick the mentioned user.");
    }

  }
}