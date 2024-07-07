const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { prefix } = require('../../config.json');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "seek",
    description: "Seeks to a certain point in the current track.",
    cooldown: 5000,
    aliases: ['تقديم'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            const song = queue.songs[0]
            if (!queue.autoplay && queue.formattedCurrentTime <= song.formattedDuration) return message.reply({ content: `:no_entry_sign:  Max formattedDuration: [${queue.formattedCurrentTime} / ${song.formattedDuration}]` });
            if(!args[0]) return message.reply(`:rolling_eyes: - Example \`${prefix}seek **1**\``)
            message.reply({ content: `:notes: seeked the song for \`${args[0]} seconds\`` })
            return distube.seek(message, Number(args[0] * 1000));
        } catch (err) {
            console.log(err)
        }
    },
};