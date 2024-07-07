const { EmbedBuilder, CommandInteraction } = require('discord.js')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "ping",
    description: "Test the bots response time.",
    async execute(client, interaction) {
        try {
            interaction.reply({ content: `:ping_pong: Pong ${client.ws.ping} ms`, ephemeral: true });
        } catch (err) {
            console.log(err)
        }
    }
}