const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { color, logo } = require('../../../slappey.json');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    
    message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cannot use this command");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I cannot ban this user because i require the \`BAN_MEMBERS\` permission.");

    let reason = args.slice(1).join(" ");
    let userID = args[0];

    if (!reason) reason = "No Reason Given";
    if (!args[0]) return message.channel.send("You must state someone to unban. \`-unban ID reason\`");

    const su6Embed = new Discord.MessageEmbed()

    .setTitle(`The User ${args[0]} Is Sucessfully Unbanned From The Server`)
    .setColor(color)
    .setThumbnail(logo)
    .setDescription(`Reason: ${reason}`)
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send('This server does not have anyone banned.');

      let bUser = bans.find(b => b.user.id == userID);

      if(!bUser) return message.channel.send("The user ID stated is not banned.");

      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.user("Something went wrong unbanning the id");
      }).then(() => {
        message.channel.send(su6Embed);
      });

    });

  }
}