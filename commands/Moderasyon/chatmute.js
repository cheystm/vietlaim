module.exports = {
    config: {
        name: "chatmute",
        aliases: ["textmute", "mute", "tmute"],
        usage: "<@Member || ID> <reason>",
        category: "Moderasyon",
        description: "Etiketlediğiniz üyeyi sunucuda yazı kanallarında susturursunuz.",
        accessableby: "Text mute hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.textmute) || message.guild.channels.cache.find(x => x.name === "mute-log");
        let rol = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.textmute);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.textmute.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata olıştu',
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

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        let reason = args.splice(2).join(" ");

        if (!member || member.roles.cache.has(rol.id)) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, susturmak istediğin kişiyi belirtmelisin!',
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
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                      name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, kendini susturamazsın',
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (!time || !reason) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                      name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, süre ve sebep belirtmelisin örneğin: .mute @cheystm 15m kural ihlali',
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

        member.roles.add(rol.id).catch();

        db.set(`penal.${penalno}.${message.guild.id}`, {
            no: penalno,
            type: "Text-Mute",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });
        db.push(`penals.${message.guild.id}`, {
            no: penalno,
            type: "Text-Mute",
            time: penaltime,
            reason: reason,
            suspended: member.id

        });
        db.set(`tmute.${message.guild.id}.${member.id}`, time)

        message.channel.send({
            embed: {
                color: `RANDOM`,
                title: 'Hey, işleminiz başarılı',
                author: {
                   name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                description: `${member} **sunucuda susturuldu!**`,
                footer: {
                     icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        });

        log.send({
            embed: {
                color: `RANDOM`,
                title: 'Bir Kişi Susturuldu',
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
        });

        setTimeout(() => {
            if (!member.roles.cache.has(rol.id)) return;
            member.roles.remove(rol.id).catch();
            db.delete(`tmute.${message.guild.id}.${member.id}`);
            log.send({
                embed: {
                    color: `RANDOM`,
                    author: {
                       name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: `${member}\, susturulma cezan bitmiştir.`,
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            });
        }, bot.ms(time));
    }
};
