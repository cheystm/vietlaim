module.exports = {
    config: {
        name: "avatar",
        aliases: ["profil-resmi", "pp"],
        usage: "(@member || ID)",
        category: "Genel",
        description: "Kendi ve bir üyenin avatarını büyütürsünüz.",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (args[0]) {
            message.channel.send({
                embed: {
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },

                    color: `RANDOM`,

                    image: {
                        url: `${user.user.displayAvatarURL({dynamic: true})}` + '?size=4096'
                    },

                    timestamp: new Date(),

                    footer: {
                        icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }
                }
            })
        } else if (!args[0]) {
            message.channel.send({
                embed: {
                    author: {
                        name: 'Sancho',
                        icon_url: 'https://cdn.discordapp.com/avatars/1157332387760443485/3d0c9bedc626c9cd91353a45426c1331.png?size=2048',
                    },

                    color: `RANDOM`,

                    image: {
                        url: `${user.user.displayAvatarURL({ dynamic: true })}` + '?size=4096'
                    },

                    timestamp: new Date(),

                    footer: {
                       icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/3a45820f9bffde364b83a954f9cbcddc.png?size=2048',
                    text: 'Created By cheystm',
                    }

                }
            })
        }

    }
};
