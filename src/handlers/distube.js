const {DisTube} = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const {EmbedBuilder} = require('discord.js');

module.exports = client => {
    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddListWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: 'highestaudio',
            format: 'audioonly',
            liveBuffer: 60000,
            dlChunkSize: 1020 * 1024 * 4,
        },
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin({

            })
        ]
    });

    client.distube.on('playSong', (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setDescription(song.url)
                .setURL(song.url)
                .setColor('#8400ff')
                .setFooter({text: `Añadida por: ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        });
    })

    client.distube.on('addSong', (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Añadido: \`${song.name}\` - \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setURL(song.url)
                .setColor('#8400ff')
                .setFooter({text: `Añadida por: ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        });
    })

    client.distube.on('initQueue', (queue) => {
        queue.autoplay = true;
    })
}