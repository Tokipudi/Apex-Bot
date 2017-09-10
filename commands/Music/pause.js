exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) {
    throw `I am not connected in a voice channel, please add some songs to the queue first with ${msg.guild.settings.prefix}add`;
  }
  if (msg.guild.voiceConnection.dispatcher.paused) {
    return msg.channel.send("The stream is already paused.");
  }
  msg.guild.voiceConnection.dispatcher.pause();
  return msg.channel.send("⏸ Paused");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "pause",
  description: "Pauses the current song.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
