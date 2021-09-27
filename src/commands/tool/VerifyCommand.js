const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

  async run(client, message, args) {
    message.delete();

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require \`MANAGE_ROLES\` permission to give a role to a member.");

    const role = message.guild.roles.cache.get('845394451835781201');

    await message.member.roles.add(role.id).then(message.channel.send(`You are now verified!`)).catch (err => console.log(err));
    
  }
}