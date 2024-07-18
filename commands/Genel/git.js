module.exports = {
    config: {
        name: "git",
        noaliases: [],
        usage: "<@Member || ID>",
        category: "Genel",
        description: "Etiketlediğiniz üye sesteyse yanına götürür.",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let em = bot.ayar.Genel.infoemoji;

        if (!message.member.voice.channel) {
            return message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, bu komutu kullanabilmek için ses kanallarında olmalısın.',
                    footer: {
                        icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                        text: 'Created By cheystm',
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
        }

        if (!args[0]) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, yanına çekmek istediğiniz kişiyi etiketleyin veya ID girin',
                    footer: {
                       icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                        text: 'Created By cheystm',
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member || !member.voice.channel) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: `RANDOM`,
                    title: 'Bir hata oluştu',
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },
                    description: 'Hey, belirttiğiniz kişiyi ses kanallarında bulamadım',
                    footer: {
                         icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                        text: 'Created By cheystm',
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        const filter = (reaction, user) => {
            if (!bot.emojis.cache.get(em.no) || !bot.emojis.cache.get(em.no)) {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === member.id;
            } else {
                return [em.yes, em.no].includes(reaction.emoji.id) && user.id === member.id;
            }
        };

        message.channel.send(`${member}, ${message.author} ses kanalında yanına gelmek istiyor!`)
            .then(a => {
                a.react(em.yes || '✅');
                a.react(em.no || '❌');
                a.delete({ timeout: 90000 });
                a.awaitReactions(filter, {
                    max: 1,
                    time: 90000,
                    errors: ['time']
                }).then(collected => {
                    let reaction = collected.first();
                    if (!bot.emojis.cache.get(em.no) || !bot.emojis.cache.get(em.no)) {
                        if (reaction.emoji.name === '✅') {
                            a.delete();
                            message.channel.send(`${message.author}, işlem onaylandı!`).then(msg => msg.delete({ timeout: 9000 })).catch();
                            message.member.voice.setChannel(member.voice.channel.id).catch();
                        } else {
                            a.delete();
                            message.channel.send(`${message.author}, işlem onaylanmadı!`).then(msg => msg.delete({ timeout: 9000 })).catch();
                        }
                    } else {
                        if (reaction.emoji.id === em.yes) {
                            a.delete();
                            message.channel.send(`${message.author}, işlem onaylandı!`).then(msg => msg.delete({ timeout: 9000 })).catch();
                            message.member.voice.setChannel(member.voice.channel.id).catch();
                        } else {
                            a.delete();
                            message.channel.send(`${message.author}, işlem onaylanmadı!`).then(msg => msg.delete({ timeout: 9000 })).catch();
                        }
                    }
                });
            })

    }
};
