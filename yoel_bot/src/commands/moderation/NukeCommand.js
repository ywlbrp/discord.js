const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You cannot use this command.');
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('My role does not have the \`MANGE_CHANNELS\` permission so i cannot nuke this channel');

    const nukeChannel = message.channel;
  
    if(!nukeChannel.deletable) return message.channel.send("This Channel Is Not Deletable.");

    await nukeChannel.clone({ position: nukeChannel.rawPosition }).then(ch => { ch.send('Channel Nuked \n https://i.gifer.com/6Ip.gif');  })
    await nukeChannel.delete().catch(err => console.log(log));
  }
}