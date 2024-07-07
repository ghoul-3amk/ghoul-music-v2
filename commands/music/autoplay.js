    const { EmbedBuilder } = require("discord.js");
    const distube = require('../../client/distube')
    const { Utils } = require("devtools-ts");
    const utilites = new Utils();

    module.exports = {
        name: "autoplay",
        description: "Toggles autoplay for the current guild.",
        cooldown: 5000,
        async execute(client, message, args) {
            try {
                const queue = distube.getQueue(message)
                if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
                if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
                if (!message.member.voice.channel)
                    return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
                const mode = distube.toggleAutoplay(message)
                if (!queue.autoplay) {
                    message.reply({ content: `:white_check_mark: Set autoplay mode to **\`${queue.autoplay ? "On" : "Off"}\`**` })
                } else {
                    message.reply({ content: `:white_check_mark: Set autoplay mode to **\`${queue.autoplay ? "On" : "Off"}\`**` })
                }
            } catch (err) {
                console.log(err)
            }
        },
    };