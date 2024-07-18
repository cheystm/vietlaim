const Database = require("../../database/Database");

module.exports = {
        config: {
            name: "invite-top",
            aliases: ["invitetop", "topdavet", "davettop"],
            nousage: "",
            category: "Invite",
            description: "Sunucuda top invite bakarsınız.",
            accessableby: "Üyeleri Yasakla"
        },
        run: async(bot, message, args) => {
                if (!message.member.permissions.has('BAN_MEMBERS')) {
                    return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
                }
                const db = new Database("./Servers/" + message.guild.id, "Invites");
                var data = db.get(`invites`) || {};

                var list = Object.keys(data).map(_data => {
                    return {
                        Id: _data,
                        Value: (data[_data].total || 0) + (data[_data].bonus || 0)
                    };
                }).sort((x, y) => y.Value - x.Value);

                message.channel.send({
                            embed: {
                                color: `RANDOM`,
                                author: {
                                    name: 'Sancho',
                                    icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                                },
                                thumbnail: {
                                    url: message.guild.iconURL({ dynamic: true })
                                },
                                title: 'Davet Sıralaması',
                                description: "\n" + `${list.splice(0, 10).map((item, index) => `\`${index + 1}.\` <@${item.Id}>: \`${item.Value} invite\``).join("\n")}`,
                timestamp: new Date(),
                footer: {
                    icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        })
    }
};
