module.exports = {
    DESCRIPTION: "Salta a la siguiente cancion en la cola de reproduccion.",
    ALIASES: ["skip", "next", "n"],
    async execute(client, message, args, prefix)
    {
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply("No hay ninguna cancion reproduciendose!")
        if(!message.member.voice?.channel) return message.reply('Tienes que estar en un canal de voz para ejecutar este comando');
        //if(message.guild.me.voice?.channel && message.guild.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('Tienes que estar en el mismo canal de voz que yo para ejecutar este comando!');

        client.distube.skip(message);
        message.reply(":track_next: Saltando a la siguiente cancion!");
    }
}