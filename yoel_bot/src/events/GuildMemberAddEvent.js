// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    
    const role = member.guild.roles.cache.get('841866270286282753');
    await member.roles.add(role.id).catch (err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name == 'welcome');
    const logChannel = member.guild.channels.cache.get("838999924179206194");
    const ruleChannel = member.guild.channels.cache.get("838996352628817961");

    const welcomeEmbed = new Discord.MessageEmbed()

    .setTitle(`Welcome ${member.user.tag} to the ${member.guild.name} discord server!`)
    .setDescription(`Please read the rules in the ${ruleChannel} channel \n\n please invite all your friends and family \n\nhttps://discord.gg/fdRqkqJCwH`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("ORANGE")
    .setFooter(member.user.tag, member.user.displayAvatarURL())
    .setTimestamp()

    await welcomeChannel.send(welcomeEmbed).catch (err => console.log(err).then(logChannel.send(err)));

  }
}