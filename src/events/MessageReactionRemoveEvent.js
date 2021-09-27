// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
const BaseEvent = require('../utils/structures/BaseEvent');
const { Role1, Role2, Emoji1, Emoji2 } = require('../../slappey.json');

module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  
  async run(client, reaction, user) {
    
    let message = reaction.message, emoji = reaction.emoji;
    const channel = '844378681756483594';
    const addRole1 = message.guild.roles.cache.find(role => role.name === Role1);
    const addRole2 = message.guild.roles.cache.find(role => role.name === Role2);

    if(reaction.message.channel.id == channel) {
      if(reaction.emoji.name == Emoji1) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(addRole1);
      }
    }

    if(reaction.message.channel.id == channel) {
      if(reaction.emoji.name == Emoji2) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(addRole2);
      }
    }

  }
}