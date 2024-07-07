const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    cooldown: 5000,
    aliases: ['p', 'ش', 'شغل'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            let player = args.slice(0).join(' ')
            if (!player) return message.reply({ content: `:no_entry_sign: You should type song name or url.` })


            const queue = distube.getQueue(message)
            message.reply({ content: `:watch: Searching ... (\`${player}\`)` }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 3000);
            }).catch(() => { });

            const voiceChannel = message.member?.voice?.channel;
            if (voiceChannel) {
                await distube.play(voiceChannel, player, {
                    message,
                    textChannel: message.channel,
                    member: message.member,
                });
            }
        } catch (err) {
            console.log(err)
        }
    },
};

