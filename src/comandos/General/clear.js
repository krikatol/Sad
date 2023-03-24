module.exports = {
    DESCRIPTION: "Limpia mensajes en el canal de texto activo",
    //PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
    //BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
    //OWNER: true,
    async execute(client, message, args, prefix)
    {
        let mensaje;
        if(parseInt(args[0])>1)
        mensaje = parseInt(args[0])+" mensajes borrados.";
        else
        mensaje = parseInt(args[0])+" mensaje borrado.";

        message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
            message.channel.send(mensaje).then(message => message.delete({timeout: 1000}));
          }).catch((err) => {
            message.delete();
            message.channel.send("Debido a las limitaciones de Discord, no puedo eliminar mensajes de las últimas 2 semanas. \n\nSi desea limpiar un canal completo, simplemente haga clic derecho en el canal y luego seleccione 'Clonar canal'");
          })
    }
}