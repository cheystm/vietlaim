module.exports = {
        config: {
            name: "stats",
            aliases: ["stat", "me", "ben"],
            nousage: "",
            category: "Stats",
            description: "Sunucuda stats bilginize bakarsınız.",
            accessableby: "@everyone"
        },
        run: async(bot, message, args) => {
                let db = bot.statsdb;
                let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
                let user = bot.users.cache.get(member.id);

                let dataMessage = await db.get(`messageData.${member.id}.channel`) || {};
                let dataVoice = await db.get(`voiceData.${member.id}.channel`) || {};

                let messageData = Object.keys(dataMessage).map(id => {
                    return {
                        channelID: id,
                        totalMessage: dataMessage[id]
                    }
                }).sort((a, b) => b.totalMessage - a.totalMessage);

                let voiceData = Object.keys(dataVoice).map(id => {
                    return {
                        channelID: id,
                        totalTime: dataVoice[id]
                    }
                }).sort((a, b) => b.totalTime - a.totalTime);

                let dataMessage0 = await db.get(`messageData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
                let dataVoice0 = await db.get(`voiceData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];

                let messageData0 = Object.values(dataMessage0).map(id => {
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })
                let voiceData0 = Object.values(dataVoice0).map(id => {
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })

                let message14 = messageData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message7 = messageData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message24 = messageData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
                let totalmessage = messageData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

                let ses14 = voiceData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses7 = voiceData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses24 = voiceData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
                let totalVoice = voiceData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

                message.channel.send({
                            embed: {
                                color: `RANDOM`,
                                author: {
                                    name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                                },
                                thumbnail: {
                                    url: user.displayAvatarURL({ dynamic: true })
                                },
                                title: user.username + " İstatistikleri",
                                description: `${member} - (${member.id})\n\nSon 14 gün içindeki kullanıcı ses ve chat istatistikleri.
                   
                \`Genel ses istatistikleri:\` ${bot.moment.duration(totalVoice).format("HH [Saat], mm [Dakika]")} 
                \`Genel text istatistikleri:\` ${totalmessage} mesaj
               
               
                \`Günlük ses ve text İstatistikleri:\`
                ⦁ **Text**: ${message24} mesaj
                ⦁ **Ses**: ${bot.moment.duration(ses24).format("HH [Saat], mm [Dakika]")} 
               \`Haftalık text ve ses istatistikleri:\`
                ⦁ **Text**: ${message7} mesaj
                ⦁ **Ses**: ${bot.moment.duration(ses7).format("HH [Saat], mm [Dakika]")} 
               \`Aylık ses ve text İstatistikleri:\` 
                ⦁ **Text**: ${message14} mesaj
                ⦁ **Ses**: ${bot.moment.duration(ses14).format("HH [Saat], mm [Dakika]")} 
               
               \` Aktif Olduğu Ses kanalı\` ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? bot.moment.duration(voiceData[0].totalTime).format("HH [Saat], mm [Dakika]") : 'Veri Yok!'}\`
               \` Aktif Olduğu Text kanalı\` ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\``,
               footer: {
                 icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
            }
            }
        })
    }
};

//https://github.com/Niwren/niwren-stats-bot
