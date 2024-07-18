module.exports = {
    config: {
        name: "unsesmute",
        aliases: ["unmute", "mutekaldir", "unvoicemute"],
        usage: "<@Member || ID> <reason>",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda ses mutesini kaldırırsınız.",
        accessableby: "Voice mute hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let penaltime = bot.moment(message.createdAt).format("lll");
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.jail) || message.guild.channels.cache.find(x => x.name === "mute-log");
        let rol = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.textmute);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.sesmute.includes(r.id))) {
            return message.channel.send({
                embed: {
                color: `RANDOM`,
                title: 'Bir hata oluştu',
                author: {
                    name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                    description: 'Hey, bu komutu kullanabilmek için gerekli izinlere sahip değilsin.',
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "Sebep Belirtilmemiş";

        if (!member || !member.roles.cache.has(rol.id)) {
            return message.channel.send({
                embed: {
                color: `RANDOM`,
                title: 'Bir hata oluştu',
                author: {
                    name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                    description: 'Hey, bir kullanıcı belirtmen gerekiyor.',
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        member.roles.remove(rol.id).catch();
        db.delete(`tmute.${message.guild.id}.${member.id}`);
        message.channel.send({
            embed: {
                color: `RANDOM`,
                title: 'Hey, işlem başarılı',
                author: {
                  name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                description: `${member}\, susturulma cezası kaldırılmıştır.`,
                footer: {
                      icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        }).catch();

        log.send({
            embed: {
                color: `RANDOM`,
                title: 'Bir Kullanıcının Susturması Kaldırıldı',
                author: {
                   name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                fields: [
                    {
                        name: 'Kullanıcı',
                        value: `${member}`,
                    },
                    {
                        name: 'Moderatör:',
                        value: `${message.author}`,
                    },
                    {
                        name: 'Tarih',
                        value: `${penaltime}`,
                    },
                ],
                footer: {
                     icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        }).catch();
    }
};
