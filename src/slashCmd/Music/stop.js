const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder().
    setDescription("Detiene la cancion reproduciendose en curso y desconecta al bot del canal de voz."),

    async execute(client, interaction, prefix)
    {
        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply("No hay ninguna cancion reproduciendose!")
        if(!interaction.member.voice?.channel) return interaction.reply('Tienes que estar en un canal de voz para ejecutar este comando');
        //if(message.guild.me.voice?.channel && message.guild.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('Tienes que estar en el mismo canal de voz que yo para ejecutar este comando!');

        client.distube.stop(interaction);
        interaction.reply("Why? D:.\nUnU");
    }
}