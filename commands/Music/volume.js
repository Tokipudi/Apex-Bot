exports.run = async (client, msg, [vol = null]) => {
  if (!msg.guild.voiceConnection) {
    return msg.reply(`I am not connected in a voice channel, please add some songs to the queue first with -add`);
  }
  const handler = client.queue.get(msg.guild.id);
  if (!handler || handler.playing === false) return msg.reply("I am not playing music.");

  const dispatcher = msg.guild.voiceConnection.dispatcher;

  if (!vol) return msg.channel.send(`📢 Volume: ${Math.round(dispatcher.volume * 50)}%`);
  if (/^[+]+$/.test(vol)) {
    if (Math.round(dispatcher.volume * 50) >= 100) return msg.channel.send(`📢 Volume: ${Math.round(dispatcher.volume * 50)}%`);
    dispatcher.setVolume(Math.min(((dispatcher.volume * 50) + (2 * (vol.split("+").length - 1))) / 50, 2));
    return msg.channel.send(`${dispatcher.volume === 2 ? "📢" : "🔊"} Volume: ${Math.round(dispatcher.volume * 50)}%`);
  }
  if (/^[-]+$/.test(vol)) {
    if (Math.round(dispatcher.volume * 50) <= 0) return msg.channel.send(`🔇 Volume: ${Math.round(dispatcher.volume * 50)}%`);
    dispatcher.setVolume(Math.max(((dispatcher.volume * 50) - (2 * (vol.split("-").length - 1))) / 50, 0));
    return msg.channel.send(`${dispatcher.volume === 0 ? "🔇" : "🔉"} Volume: ${Math.round(dispatcher.volume * 50)}%`);
  }

  return msg.channel.send("The usage of this command is either `volume +++` or `volume ---`");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "volume",
  description: "Manage the volume for current song.",
  usage: "[control:string]",
  usageDelim: "",
  extendedHelp: [
    "Let's break it down!",
    "",
    "Listen carefully, you use this command by doing either 'volume ++++' or 'volume ----'.",
    "The more '+' you write, the more the volume will increment.",
    "The more '-' you write, the more the volume will decrease.",
  ].join("\n"),
};
