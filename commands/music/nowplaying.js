const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "nowplaying",
    description: "Shows what is song that the bot is currently playing.",
    cooldown: 5000,
    aliases: ['الان', 'np', 'status'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            const song = queue.songs[0]
            const uni = `${song.playing ? ':notes: | ' : ':notes: | '}`;
            const part = Math.floor((queue.currentTime / song.duration) * 30);
            let embed = new EmbedBuilder()
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setDescription(`\nCurrent Duration: \`[${queue.formattedCurrentTime}/${song.formattedDuration}]\`\n${uni}${'▇'.repeat(part) + '▇' + '—'.repeat(24 - part)}`)
                .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
                .setFooter({ text: `@ ${song.uploader.name} | Views: ${song.views} | Like: ${song.likes}` })
            message.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    },
};