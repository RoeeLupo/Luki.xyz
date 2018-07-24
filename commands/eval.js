const discord = require("discord.js")

exports.run = async (client, msg, args, level) => { 
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    msg.channel.send({embed: {
      title: "Eval",
      description: `**Input**\n\`\`\`js\n${code}\n\`\`\`\n**Output**\n\`\`\`js\n${clean}\n\`\`\``
    }})
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Developer"
};

exports.help = {
  name: "eval",
  category: "Staff Restricted Commands",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
