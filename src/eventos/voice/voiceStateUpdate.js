const { ChannelType } = require("discord.js");

module.exports = async (client, oldState, newState) => {
    if(!oldState.channelId && newState.channelId)
    {
        if(newState.channelId === "1062417082744061982") crearSala(newState)
    }

    if(oldState.channelId && !newState.channelId)
    {
        if(mapeado.get(`temporal_${oldState.guild.id}_${oldState.channelId}`))
        {
            let canalVoz = oldState.guild.channels.cache.get(mapeado.get(`temporal_${oldState.guild.id}_${oldState.channelId}`));
            if(canalVoz)
            {
                if(canalVoz.members.size < 1)
                {
                    canalVoz.delete();
                    mapeado.delete(`temporal_${oldState.guild.id}_${oldState.channelId}`);
                }
            }
        }
    }
}

const mapeado = new Map();

async function crearSala(newState) {
    newState.guild.channels.create({
        name: `Sala de ${newState.member.user.username}`,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parent
    }).then(canal => {
      newState.member.voice.setChannel(canal)
      mapeado.set(`temporal_${newState.guild.id}_${canal.id}`, canal.id)
    })
  }