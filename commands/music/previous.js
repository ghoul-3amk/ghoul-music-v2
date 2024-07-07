const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "previous",
    description: "Plays the previous song in the queue.",
    cooldown: 5000,
    aliases: ['prev', 'back'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (queue.previousSongs.length == 0) {
                message.reply({ content: `:no_entry_sign: There is no previous song in this queue` })
            } else {
            await distube.previous(message);
            message.reply({ content: `:notes: Song has been Previous` })
            }
        } catch (err) {
            console.log(err)
        }
    },
};