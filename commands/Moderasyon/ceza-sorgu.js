module.exports = {
    config: {
        name: "cezasorgu",
        aliases: ["cezabilgi"],
        usage: "<Ceza ID>",
        category: "Moderasyon",
        description: "Girdiğiniz ceza ID ayrıntısına bakarsınız.",
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
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, bu komutu kullanabilmek için gerekli izinlere sahip değilsin!',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                   
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let ID = args[0]

        if (!ID) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: `Hey, ceza ID'si belirtmelisin`,
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let nix = db.get(`penal.${ID}.${message.guild.id}`)
        if (!nix) return message.channel.send(`${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`).then(msg => msg.delete({ timeout: 9000 })).catch();

        message.channel.send({
            embed: {
                color: `RANDOM`,
                author: {
                    name: 'Sancho',
                    icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    
                },
                description: `**Ceza ID:** \`#${nix.no}\`\n\`╰>\`**Cezalı:** <@${nix.suspended}>\n\`╰>\`**Yetkili:** <@${nix.author}>\n\`╰>\`**Ceza Türü:** \`${nix.type}\`\n\`╰>\`**Ceza Sebep:** \`${nix.reason}\`\n\`╰>\`**Ceza Tarih:** \`${nix.time}\``,
                footer: {
                      icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }

            }
        });

    }
};
