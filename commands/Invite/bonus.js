const Database = require("../../database/Database");

module.exports = {
    config: {
        name: "bonus",
        noaliases: [""],
        usage: "<@member> <number>",
        category: "Invite",
        description: "Sunucudaki üyeye bonus davet eklersiniz.",
        accessableby: "Bot Owner & Guild Owner"
    },
    run: async(bot, message, args) => {
        if (!bot.config.OWNER.includes(message.author.id) || !message.guild.owner) {
            return message.channel.send(`yeterli iznin yok`).then(msg => msg.delete({ timeout: 5000 }));
        }

        var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
        if (!victim) return message.channel.send("Hey, bir üye belirtmen gerekiyor.").then(msg => msg.delete({ timeout: 9000 }));
        victim = message.guild.member(victim);
        if (!victim) return message.channel.send("Hey, sunucuda böyle bir üye yok").then(msg => msg.delete({ timeout: 9000 }));

        var num = Number(args[1]);
        if (isNaN(num)) return message.channel.send("Geçerli bir sayı giriniz").then(msg => msg.delete({ timeout: 9000 }));
        const db = new Database("./Servers/" + message.guild.id, "Invites");

        var bonus = (db.add(`invites.${victim.id}.bonus`, num) || 0),
            total = (db.get(`invites.${victim.id}.total`) || 0);
        message.channel.send(`✔ **${num} bonus davet ${victim} kullanıcısına eklendi.**`).then(msg => msg.delete({ timeout: 9000 }));

        global.onUpdateInvite(victim, message.guild.id, total + bonus);
    }
};