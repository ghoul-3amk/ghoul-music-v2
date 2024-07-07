const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');
const db = require(`quick.db`)
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "247",
    description: "Toggles the 24/7 mode. This makes the bot doesn't leave the voice channel until you stop it.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            let channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true });

            distube.voices.join(channel).then(() => {
                if (!db.get(`24_7_${interaction.guild.id}`)) {
                    db.set(`24_7_${interaction.guild.id}`, channel.id)
                    interaction.reply({ content: `:white_check_mark: Successful enabled the 24/7!` });
                } else {
                    db.delete(`24_7_${interaction.guild.id}`)
                    interaction.reply({ content: `:white_check_mark: Successful disabled the 24/7!` })
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
};