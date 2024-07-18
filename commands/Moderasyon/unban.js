module.exports = {
    config: {
        name: "unban",
        aliases: ["yasakkaldır", "afban", "banaf"],
        usage: "<ID> (reason)",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda yasağını kaldırırsınız.",
        accessableby: "Ban hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let penaltime = bot.moment(message.createdAt).format("lll");
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
                    title: 'Bir hata oluştu',
                    description: 'Hey, bu komutu kullanabilmek için gerekli izinlere sahip değilsin',
                    footer: {
                        icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = args[0];

        if (!member) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    author: {
                     name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    title: 'Bir hata oluştu',
                    description: 'Hey, bir ID girmelisin',
                    footer: {
                          icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let kalkmaz = db.get(`permaban.${message.guild.id}.${member}`)
        let reason = args.splice(1).join(" ") || "Sebep Belirtilmemiş";

        if (kalkmaz === "yes") {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                message.guild.members.unban(member).then(user => {
                    db.delete(`permaban.${message.guild.id}.${user.id}`);
                    message.channel.send({
                        embed: {
                            color: noem.color,
                author: {
                   name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                title: 'Bir Kullanıcının Yasağı Kaldırıldı',
                
                fields: [
                    {
                        name: 'Kullanıcı',
                        value: `${user.tag}`,
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

                    log.send({
                        embed: {
                            color: `RANDOM`,
                            author: {
                               name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                            },
                            title: 'Bir Kullanıcının Yasağı Kaldırıldı',
                            
                            fields: [
                                {
                                    name: 'Kullanıcı',
                                    value: `${user.tag}`,
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
                }).catch(() => message.channel.send({
                    embed: {
                         color: `RANDOM`,
                author: {
                  name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                title: 'Bir hata oluştu',
                description: 'Hey, bu kullanıcı sunucuda yasaklı değil',
                footer: {
                     icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
                    }
                }).then(a => a.delete({ timeout: 9000})));
            } else {
                return message.channel.send({
                    embed: {
                        color: `RANDOM`,
                        author: {
                           name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                        },
                        title: 'Bir hata oluştu',
                        description: 'Hey, bu komutu kullanabilmek için gerekli izinlere sahip değilsin.',
                        footer: {
                              icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                        }
                    }
                }).then(a => a.delete({ timeout: 9000 }));
            }
            return;
        }

        message.guild.members.unban(member).then(user => {

            message.channel.send({
                embed: {
                    color: `RANDOM`,
                    author: {
                       name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    title: 'Bir Kullanıcının Yasağı Kaldırıldı',
                    
                    fields: [
                        {
                            name: 'Kullanıcı',
                            value: `${user.tag}`,
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

            log.send({
                embed: {
                    color: `RANDOM`,
                    author: {
                       name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    title: 'Bir Kullanıcının Yasağı Kaldırıldı',
                    
                    fields: [
                        {
                            name: 'Kullanıcı',
                            value: `${user.tag}`,
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
        }).catch(() => message.channel.send({
            embed: {
                color: `RANDOM`,
                author: {
                   name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                },
                title: 'Bir hata oluştu',
                description: 'Hey, bu kullanıcı sunucuda yasaklı değil',
                footer: {
                    icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        }).then(a => a.delete({ timeout: 9000 })));
    }
};
