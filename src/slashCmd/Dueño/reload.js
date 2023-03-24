const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Recarga los archivos del bot.")
    .addStringOption(option => 
        option.setName("modulo")
        .setDescription("Modulo a recargar")
        .addChoices(
            {name: "Comandos", value: "comandos"},
            {name: "Comandos Diagonales", value: "slash"},
            {name: "Eventos", value: "eventos"},
            {name: "Handlers", value: "handlers"},
        )
    ),

    async execute(client, interaction, prefix){
        let args = interaction.options.getString("modulo");
        let opcion = "Comandos, Eventos y Handlers";

        try
        {
            switch(args?.toLowerCase())
            {
                case "commands":
                case "comandos": {
                    opcion = "Comandos"
                    await client.loadCommands();
                }
                break;
                case "slash": {
                    opcion = "Comandos Diagonales"
                    await client.loadSlashCmd();
                }
                    break;
                case "eventos": {
                    opcion = "Eventos"
                    await client.loadEvents();
                }
                    break;
                case "handlers": {
                    opcion = "Handlers"
                    await client.loadHandlers();
                }
                    break;
                
                default: {
                    await client.loadEvents();
                    await client.loadHandlers();
                    await client.loadSlashCmd();
                    await client.loadCommands();
                }
                    break;
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields({name: `${opcion} Recargados`, value: `*Okay!*`})
                    .setColor(process.env.COLOR)
                ],
                ephemeral: true
            });
        }
        catch(e)
        {
            message.reply({content: `**Ha ocurrido un error al regargar los archivos!**\n*Mira la consola para mas detalles*`});
            console.log(e);
        }
    }
}