module.exports = {
    DESCRIPTION: "Sirve para ver el ping del bot",
    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
    //BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"],
    OWNER: true,
    async execute(client, message, args, prefix)
    {
        return niby.reply(`\`${client.ws.ping}ms\``);
    }
}