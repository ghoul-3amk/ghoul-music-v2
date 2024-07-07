const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const db = require(`quick.db`)
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "repeat",
    description: "Toggles the repeat mode.",
    cooldown: 5000,
    aliases: ['loop', 'تكرار'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
                distube.setRepeatMode(message, parseInt(args[0]))
                message.reply({ content: `:notes: **Repeat mode set to:** ${args[0].replace("0", "\`OFF\`").replace("1", "\`Repeat song\`").replace("2", "\`Repeat Queue\`")}` })
            } else {
                message.reply({ content: `:no_entry_sign: Please use a number between **0** and **2**   |   0: **disabled**, 1: **Repeat a song**, 2: **Repeat all the queue**` })
            }
        } catch (err) {
            console.log(err)
        }
    },
};