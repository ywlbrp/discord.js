const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { color, logo } = require('../../../slappey.json');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    message.delete();

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannot use this command.");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I require \`MANAGE_CHANNELS\` permssion to lock the channel")

    const role = message.guild.roles.cache.get('838582064731127848');
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    const su6embed = new Discord.MessageEmbed()

    .setTitle("Locked")
    .setDescription("This Channel Is Locked! :lock:")
    .setColor(color)
    .setThumbnail(logo)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()


    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err));
    message.channel.send(su6embed);
  }
}