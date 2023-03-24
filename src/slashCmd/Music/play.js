const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder().
    setDescription("Reproduce una rolita.")
    .addStringOption(option => 
        option.setName("param")
        .setDescription("Nombre o URL de cancion a reproducir")
        .setRequired(true)
    ),

    async execute(client, interaction, prefix)
    {
        let args = interaction.options.getString("param");
        if(!args) return interaction.reply('Tienes que especificar el nombre de una cancion!');
        if(!interaction.member.voice?.channel) return interaction.reply('Tienes que estar en un canal de voz para ejecutar este comando');
        //if(message.guild.me.voice?.channel && message.guild.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('Tienes que estar en el mismo canal de voz que yo para ejecutar este comando!');

        client.distube.play(interaction.member.voice?.channel, args, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        });

        interaction.reply(`:mag: Buscando \'${args}\'`);
    }
}