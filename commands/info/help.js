const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { prefix } = require('../../config.json');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    cooldown: 5000,
    async execute(client, message, args) {
        try {
            const globPromise = promisify(glob);
            const commandFiles = await globPromise(`${process.cwd()}/commands/music/**/*.js`);

            let embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            /*
                            .addFields(
                                { name: `${prefix}247`, value: `Toggles the 24/7 mode. This makes the bot doesn't leave the voice channel until you stop it.`, inline: false },
                                { name: `${prefix}autoplay`, value: `Toggles autoplay for the current guild.`, inline: false },
                                { name: `${prefix}join`, value: `join the voice channel.`, inline: false },
                                { name: `${prefix}jump`, value: `Skip to a song in the queue.`, inline: false },
                                { name: `${prefix}leave`, value: `leave the voice channel.`, inline: false },
                                { name: `${prefix}loop`, value: `Toggles the repeat mode.`, inline: false },
                                { name: `${prefix}lyrics`, value: `Display lyrics of a song`, inline: false },
                                { name: `${prefix}nowplaying`, value: `Shows what is song that the bot is currently playing.`, inline: false },
                                { name: `${prefix}pause`, value: `Pauses the currently playing track.`, inline: false },
                                { name: `${prefix}play`, value: `Add a song to queue and plays it.`, inline: false },
                                { name: `${prefix}previous`, value: `Plays the previous song in the queue.`, inline: false },
                                { name: `${prefix}queue`, value: `Display the queue of the current tracks in the playlist.`, inline: false },
                                { name: `${prefix}resume`, value: `Resumes the currently paused track.`, inline: false },
                                { name: `${prefix}search`, value: `Search song and play music.`, inline: false },
                                { name: `${prefix}seek`, value: `Seeks to a certain point in the current track.`, inline: false },
                                { name: `${prefix}shuffle`, value: `Shuffle the queue.`, inline: false },
                                { name: `${prefix}skip`, value: `Skip the current song.`, inline: false },
                                { name: `${prefix}stop`, value: `Stop the current song and clears the entire music queue.`, inline: false },
                                { name: `${prefix}volume`, value: `Changes/Shows the current volume.`, inline: false },
                                )
            */
            commandFiles.map((value) => {
                const file = require(value);
                const splitted = value.split("/");
                const directory = splitted[splitted.length - 2];

                if (file.name) {
                    const properties = { directory, ...file };
                    embed.addFields({ name: `${prefix}${properties.name}`, value: `${properties.description}`, inline: false })
                }
            });

            let row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Invite Bot')
                        .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))

                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Server Support')
                        .setURL(`https://discord.gg/developer-tools`))

            message.reply({ embeds: [embed], components: [row] })
        } catch (err) {
            console.log(err)
        }
    },
};