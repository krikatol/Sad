const { EmbedBuilder, ButtonBuilder, ActionRowBuilder  } = require("@discordjs/builders");
const { Embed, ButtonStyle } = require("discord.js");

module.exports = {
    DESCRIPTION: "Muestra la lista de canciones",
    ALIASES: ["queue", "q"],
    async execute(client, message, args, prefix)
    {
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply("No hay ninguna cancion reproduciendose!")
        if(!message.member.voice?.channel) return message.reply('Tienes que estar en un canal de voz para ejecutar este comando');
        //if(message.guild.me.voice?.channel && message.guild.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('Tienes que estar en el mismo canal de voz que yo para ejecutar este comando!');

        let listaQueue = [];
        var maxSongsShowed = 10;
        //mapeado de canciones para introducirlas al array listaQueue
        for(let i=0; i < queue.songs.length; i+=maxSongsShowed)
        {
            let canciones = queue.songs.slice(i, i + maxSongsShowed);
            listaQueue.push(canciones.map((cancion, index) => `**\`${i+ ++index}\`** - [\`${cancion.name}\`](${cancion.url})`).join('\n'))
        }

        var limite = listaQueue.length,
            embeds = [];
        
        //loop entre todas las canciones hasta el limite
        for(let i=0; i < limite; i++)
        {
            let desc = String(listaQueue[i].substring(0, 2048)); //se asegura de que la longitud del mensaje sea menor que 2048 para evitar errores
            //se crea un embed por cada 10 canciones
            let embed = new EmbedBuilder()
            .setTitle(`Cola de ${message.guild.name} - \`${queue.songs.length} ${queue.songs.length > 1 ? "Canciones" : "Cancion"}\``)
            .setDescription(desc)
            //si la cantidad de canciones a mostrar es mayor a 1 especificar en el embed la cancion que se reproduce en curso
            if(queue.songs.length > 1) embed.addFields({name: `Cancion actual`, value: `**[\`${queue.songs[i].name}\`]**`});
            await embeds.push(embed)
        }
        
        return paginacion();
        //funcion paginacion
        async function paginacion(){
            let paginaActual = 0;

            if(embeds.length == 1) return message.channel.send({embeds: [embeds[0]]}).catch(()=>{});

            let botonAtras = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('Atras').setEmoji('⬅️').setLabel('Atras'),
            botonInicio = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio'),
            botonAvanzar = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('Avanzar').setEmoji('➡️').setLabel('Avanzar');
            let embedPaginas = await message.channel.send({
                content: `Haz clic en los __botones__ para cambiar de paginas`,
                embeds: [embeds[0].setFooter({text: `Pagina ${paginaActual+1} / ${embeds.length}`})],
                components: [new ActionRowBuilder().addComponents([botonAtras, botonInicio, botonAvanzar])]
            });

            const collector = embedPaginas.createMessageComponentCollector({filter: i => i?.isButton() && i?.user.id == message.author.id && i?.message.author.id == client.user.id, time: 180e3});

            collector.on('collect', async b => {
                if(b.user.id != message.author.id) return b?.reply({content: `Solo la persona que ha escrito \`${prefix}queue\` puede cambiar de paginas!`});

                switch(b?.customId)
                {
                    case "Atras":{
                        collector.resetTimer();
                        if(paginaActual!=0) {
                            paginaActual -= 1;
                            await embedPaginas.edit({embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual-1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
                            await b?.deferUpdate();
                        }
                        else{
                            paginaActual = embeds.length - 1;
                            await embedPaginas.edit({embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual-1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
                            await b?.deferUpdate();
                        }
                    } break;
                    case "Inicio":{
                        collector.resetTimer();

                        paginaActual = 0; 
                        await embedPaginas.edit({embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual-1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
                        await b?.deferUpdate();
                    } break;
                    case "Avanzar":{
                        collector.resetTimer();
                        if(paginaActual < embeds.length - 1) {
                            paginaActual++;
                            await embedPaginas.edit({embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual+1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
                            await b?.deferUpdate();
                        }
                        else{
                            paginaActual = 0;
                            await embedPaginas.edit({embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual+1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
                            await b?.deferUpdate();
                        }
                    } break;
                }
            });
            
            collector.on('end', () => {
                embedPaginas.components[0].components.map(boton => botonDisabled = true);
                embedPaginas.edit({content: `El tiempo ha expirado, vuelve a ejecutar el comando para ver la cola de canciones.`,embeds: [embeds[paginaActual].setFooter({text: `Pagina ${paginaActual+1} / ${embeds.length}`})], components: [embedPaginas.components[0 ]]}).catch(()=>{});
            })
            
        }

    }
}