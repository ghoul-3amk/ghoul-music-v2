const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "jump",
    description: "Skip to a song in the queue.",
    cooldown: 5000,
    aliases: ['skipto'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
                message.reply({ content: `:notes: Jumped songs!` })
                return distube.jump(message, parseInt(args[0]))
                    .catch(err => message.reply({ content: `:no_entry_sign: Invalid song number.` }));
            } else {
                message.reply({ content: `:no_entry_sign: Please use a number between **0** and **${queue.songs.length}**` })
            }
        } catch (err) {
            console.log(err)
        }
    },
};