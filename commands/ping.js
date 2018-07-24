exports.run = async (client, msg, args, level) => {
    msg.channel.send(`Pong! Latency is ${msg.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "General",
    description: "It... well... ping the bot...",
    usage: "ping"
};


