const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'moderation', []);
  }

  async run(client, message, args) {

    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot use this command.");
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the \`MANAGE_MESSAGES\` permission so i cannot send the message you want me to say.");
    if (!args[0]) return message.channel.send("You need to state a message to say. \`-say message\`");

    const messageToSay = args.join(" ");

    const embed = new Discord.MessageEmbed()
    .setTitle(`${messageToSay}`)
    .setColor("#c0b584")
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp()

    try{
      await message.channel.send(embed)
    } catch (err){
      console.log(err)
      message.channel.send("I could not send the message, check the console for more information about the error.");
    }

  }
}