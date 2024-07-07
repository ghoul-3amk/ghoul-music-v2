const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { prefix } = require('../../config.json');
const { Utils } = require("devtools-ts");
const utilites = new Utils();


module.exports = {
    name: "help",
    description: 'Feeling lost?',
    async execute(client, interaction) {
        try {
            const globPromise = promisify(glob);
            const commandFiles = await globPromise(`${process.cwd()}/SlashCommands/music/**/*.js`);

            let embed = new EmbedBuilder()

                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            /*
                            .addFields(
                                { name: `/247`, value: `Toggles the 24/7 mode. This makes the bot doesn't leave the voice channel until you stop it.`, inline: false },
                                { name: `/autoplay`, value: `Toggles autoplay for the current guild.`, inline: false },
                                { name: `/join`, value: `join the voice channel.`, inline: false },
                                { name: `/jump`, value: `Skip to a song in the queue.`, inline: false },
                                { name: `/leave`, value: `leave the voice channel.`, inline: false },
                                { name: `/loop`, value: `Toggles the repeat mode.`, inline: false },
                                { name: `/lyrics`, value: `Display lyrics of a song`, inline: false },
                                { name: `/nowplaying`, value: `Shows what is song that the bot is currently playing.`, inline: false },
                                { name: `/pause`, value: `Pauses the currently playing track.`, inline: false },
                                { name: `/play`, value: `Add a song to queue and plays it.`, inline: false },
                                { name: `/previous`, value: `Plays the previous song in the queue.`, inline: false },
                                { name: `/queue`, value: `Display the queue of the current tracks in the playlist.`, inline: false },
                                { name: `/resume`, value: `Resumes the currently paused track.`, inline: false },
                                { name: `/search`, value: `Search song and play music.`, inline: false },
                                { name: `/seek`, value: `Seeks to a certain point in the current track.`, inline: false },
                                { name: `/shuffle`, value: `Shuffle the queue.`, inline: false },
                                { name: `/skip`, value: `Skip the current song.`, inline: false },
                                { name: `/stop`, value: `Stop the current song and clears the entire music queue.`, inline: false },
                                { name: `/volume`, value: `Changes/Shows the current volume.`, inline: false },
                                )
            */
            commandFiles.map((value) => {
                const file = require(value);
                const splitted = value.split("/");
                const directory = splitted[splitted.length - 2];

                if (file.name) {
                    const properties = { directory, ...file };
                    embed.addFields({ name: `/${properties.name}`, value: `${properties.description}`, inline: false })
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

            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        } catch (err) {
            console.log(err)
        }
    },
};