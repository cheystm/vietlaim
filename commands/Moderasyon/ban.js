module.exports = {
    config: {
        name: "ban",
        aliases: ["yasakla", "uçur", "banla", "yargı"],
        usage: "<@Member || ID> (reason)",
        category: "Moderasyon",
        description: "Etiketlediğiniz üyeyi sunucudan yasaklarsınız.",
        accessableby: "Ban hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.ban) || message.guild.channels.cache.find(x => x.name === "ban-log");

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.ban.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, bu komutu kullanabilmek için yeterli izinlere sahip değilsin',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "Sebep Belirtilmemiş";

        if (!member) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    title: 'Bir hata oluştu',
                    description: 'Hey, sunucudan uzaklaştırmak istediğin kişiyi etiketlemelisin!',
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (bot.config.OWNER.includes(member.id) || !member.bannable || (message.member.roles.highest.position <= member.roles.highest.position)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, bu kullanıcıyı uzaklaştıramazsın',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (message.author.id === member.id) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, kendini sunucudan uzaklaştırmazsın.',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let penaltime = bot.moment(message.createdAt).format("lll");
        let penalno = db.fetch(`penalno.${message.guild.id}`) || 1;
        db.add(`penalno.${message.guild.id}`, +1);

        message.guild.members.ban(member, { days: 7, reason: reason }).catch();

        db.set(`penal.${penalno}.${message.guild.id}`, {
            no: penalno,
            type: "Ban",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });
        db.push(`penals.${message.guild.id}`, {
            no: penalno,
            type: "Ban",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });

        message.channel.send({
            embed: {
                color: noem.color,
                author: {
                    name: 'Sancho',
                    icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                title: 'Hey, işleminiz başarılı',
                description: `${member} **sunucudan yasaklandı!**`,
                footer: {
                      icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        });

        log.send({
            embed: {
                color: `RANDOM`,
                author: {
                    name: 'Sancho',
                    icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                title: 'Bir Kullanıcı Sunucudan Yasaklandı',
                
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
                        name: 'Sebep',
                        value: `${reason}`,
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
        })
    }
};
