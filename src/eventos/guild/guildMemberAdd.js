const {Welcome} = require("niby-welcomes");
const {AttachmentBuilder} = require('discord.js');
module.exports = async (client, member) => {
    let welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "bienvenidos"),
        rulesChannel = member.guild.channels.cache.find(channel => channel.name === "rules").toString(),
        welcomeMessage = `${member} Gracias por unirte a la comunidad "**${member.guild}.**" \n\nAsegurate de revisar las reglas en ${rulesChannel}`;

    let fondos = ['https://i.imgur.com/2JSsEsJ.jpg', 
                    'https://i.imgur.com/A2P3NNN.jpg',
                    'https://i.imgur.com/45cibVz.jpg',
                    'https://i.imgur.com/voj6YA8.jpg'
                ];

    let iBackground = Math.floor(Math.random() * (4 - 1) + 1);
    let usrAvatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;

    //CREACIÓN DE BUFFER DE IMAGEN (BIENVENIDA)
    let welcomeImage = await new Welcome()
    .setWelcomeMessage("BIENVENID@")
    .setUsername(member.user.username)
    .setMemberCount(`Eres el número #${member.guild.memberCount}`)
    .setAvatar(usrAvatar)
    .setBackgroundUrl(fondos[iBackground])
    .setBorder(true)
    .setStyle("koya") //koya, mee6
    .build();
    
    //attachment
    let attachment = new AttachmentBuilder(welcomeImage, {name: `bienvenida-${member.user.tag}.png`});

    //enviamos el mensaje con la bienvenida
    welcomeChannel.send({content: welcomeMessage, files: [attachment]});
}