const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { color, logo, Emoji1, Emoji2 } = require(' ../../../slappey.json');

module.exports = class ReactionroleCommand extends BaseCommand {
  constructor() {
    super('reactionrole', 'tool', []);
  }

  async run(client, message, args) {
    
    message.delete();

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You cannot use this command.');
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have the \`MANAGE_ROLES\` Permission so i cannot give a role to the member.");

    const reactionEmbed = new Discord.MessageEmbed()

    .setTitle("Reaction Roles")
    .setDescription("Please React With The Reactions Bellow To Get The Role\n\n 🇺🇸 = English\n 🏴‍☠️ = Pirate")
    .setColor(color)
    .setThumbnail(logo)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL)

    let messageReaction = await message.channel.send(reactionEmbed).catch(err => {console.log(err)});

    messageReaction.react(Emoji1);
    messageReaction.react(Emoji2);
  }
}