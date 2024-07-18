module.exports = {
    config: {
        name: "top-stats",
        aliases: ["topstats", "top-stat", "topstat", "top"],
        nousage: "",
        category: "Stats",
        description: "Sunucuda top stats bilginisine bakarsınız.",
        accessableby: "Üyeleri Yasakla"
    },
    run: async(bot, message, args) => {
        let db = bot.statsdb;
        let dataMessage = await db.get(`messageData`) || {};
        let dataVoice = await db.get(`voiceData`) || {};

        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `${message.guild.members.cache.get(data.userID)}: \`${data.data} Mesaj\``)

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `${message.guild.members.cache.get(data.userID)}: \`${bot.moment.duration(data.data).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\``)

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
                title: message.guild.name + " İstatistik Sıralaması",
                fields: [{
                        name: "\`Text kanalları sıralaması ilk 10\`",
                        value: topMessage.length >= 1 ? topMessage : "Veri Yok!"
                    },
                    {
                        name: "\`Ses kanalları sıralaması ilk 10\`",
                        value: topVoice.length >= 1 ? topVoice : "Veri Yok!"
                    }
                    
                ],
                footer: {
                    icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                }
            }
        })
    }
};
