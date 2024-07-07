const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "leave",
    description: "leave the voice channel.",
    cooldown: 5000,
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId !== message.member.voice.channelId) return message.reply({ content: `:no_entry_sign: I'm not there already \`${message.member.voice.channel.name}\`` });
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            let channel = message.member.voice.channel;
            if (!channel) return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" });
            distube.voices.leave(message.guild)
            return message.reply({ content: `:white_check_mark: Succesfully leave \`${channel.name}\`` });
        } catch (err) {
            console.log(err)
        }
    },
};