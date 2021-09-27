const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    const server = client.guilds.cache.size;

    client.user.setPresence({
      activity: {
        name: `I'm in ${server} servers!`,
        type: "WATCHING"
      },
      status: 'dnd'
    })
    .catch(console.error);

  }
}