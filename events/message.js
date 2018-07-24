module.exports = (client, msg) => {

  if (msg.author.bot) return;


  const settings = msg.settings = client.getGuildSettings(msg.guild);

  if (msg.content.indexOf(settings.prefix) !== 0) return;

  const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const level = client.permlevel(msg);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  if (cmd && !msg.guild && cmd.conf.guildOnly)
    return msg.channel.send("This command is unavailable via private msg. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return msg.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  msg.author.permLevel = level;
  
  msg.flags = [];
  while (args[0] && args[0][0] === "-") {
    msg.flags.push(args.shift().slice(1));
  }
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${msg.author.username} (${msg.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, msg, args, level);
};