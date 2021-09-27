// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const { ReactionCollector } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
const { Role1, Role2, Emoji1, Emoji2 } = require('../../slappey.json');

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    
    let message = reaction.message, emoji = reaction.emoji;
    const channel = '844378681756483594';
    const addRole1 = message.guild.roles.cache.find(role => role.name === Role1);
    const addRole2 = message.guild.roles.cache.find(role => role.name === Role2);

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id == channel) {
      if(reaction.emoji.name == Emoji1) {
        await reaction.message.guild.members.cache.get(user.id).roles.add(addRole1);
      }
    }

    if(reaction.message.channel.id == channel) {
      if(reaction.emoji.name == Emoji2) {
        await reaction.message.guild.members.cache.get(user.id).roles.add(addRole2);
      }
    }

  }
}