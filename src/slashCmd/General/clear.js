const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder().
    setDescription("Elimina mensajes del canal de texto activo.")
    .addStringOption(option => 
        option.setName("cantidad")
        .setDescription("Cantidad de mensajes a eliminar")
        .setRequired(true)
    ),

    async execute(client, interaction, prefix)
    {
        let args = interaction.options.getString("cantidad");
        let mensaje;
        if(parseInt(args)>1)
        mensaje = parseInt(args)+" mensajes borrados.";
        else
        mensaje = parseInt(args)+" mensaje borrado.";

        interaction.channel.bulkDelete(parseInt(args) + 1).then(() => {
            interaction.reply(mensaje)
          }).catch((err) => {
            //message.delete();
            interaction.reply({content: "Debido a las limitaciones de Discord, no puedo eliminar mensajes de las últimas 2 semanas. \n\nSi desea limpiar un canal completo, simplemente haga clic derecho en el canal y luego seleccione 'Clonar canal'", ephemeral: true});
          })
    }
}