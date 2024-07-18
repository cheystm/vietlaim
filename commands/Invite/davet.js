const Database = require("../../database/Database");

module.exports = {
    config: {
        name: "davet",
        aliases: ["invites", "invite", "davetlerim"],
        usage: "(@member)",
        category: "Invite",
        description: "Sunucuda invite sayısına bakarsınız.",
        accessableby: "@everyone"
    },
    run: async(bot, message, args) => {
        const db = new Database("./Servers/" + message.guild.id, "Invites");
        var victim = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
        var data = db.get(`invites.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };

        message.channel.send({
            embed: {
                color: `RANDOM`,
                author: {
                    name: 'Sancho',
                    icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                thumbnail: {
                    url: message.author.displayAvatarURL({ dynamic: true })
                },
                title: message.author.username + " Davet Bilgileri",
                description: `**${(data.total || 0) + (data.bonus || 0)}** davetin var! (**${data.regular || 0}** normal, **${data.bonus || 0}** bonus, **${data.leave || 0}** ayrılan, **${data.fake || 0}** sahte)`,
                footer: {
                     icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        })
    }
};
