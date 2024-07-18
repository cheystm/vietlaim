module.exports = {
    config: {
        name: "sicil",
        noaliases: [],
        usage: "<@Member || ID>",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda cezalarına bakarsınız.",
        accessableby: "Yönetici"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'text',
                    author: {
                       name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description:'Hey, bu komutu kullanabilmek için gerekli izinlere sahip değilsin!',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                       name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, bir kullanıcı belirtmelisin!',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let wida = db.get(`penals.${message.guild.id}`)
        if (!wida) return message.channel.send(`${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
        let kayıtlar = wida.filter(x => x.suspended === member.id).map(nix => `**Ceza ID:** \`#${nix.no}\`\n\`╰>\`**Ceza Türü:** \`${nix.type}\` / **Ceza Sebebi:** \`${nix.reason}\`/ **Ceza Tarihi:** \`${nix.time}\``).join("\n")
        if (!kayıtlar) kayıtlar = `${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`


        message.channel.send({
            embed: {
                color: `RANDOM`,
                author: {
                   name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                description: kayıtlar,
                footer: {
                      icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        });

    }
};
