module.exports = {
    OWNER: ["867073097876897802"], //Bot sahip ID' leri
    GUILD_ID: "1258119074236469358", //Sunucu ID
    durum: { activity: { name: "" }, status: "idle" }, //Bot durumu
    VOICE: "", //Botun gireceği ses kanalı
    Embeds: {
        okEmbed: {
            color: "RANDOM",
            author: {
                name: 'Vietlaim',
                icon_url: 'https://cdn.discordapp.com/avatars/1261695405058555924/317126cc0b5694cae92f873fccd9cfa3.png?size=4096',
            },
            title: "İşlem başarıyla gerçekleştirildi",
            footer: {
                icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/4377ec22766b174a7d20ba340a081cfd.png?size=4096',
                text: 'Created By cheystm',
            }
            
        },
        noEmbed: {
            color: "RANDOM",
            author: {
                name: 'Vietlaim',
                icon_url: 'https://cdn.discordapp.com/avatars/1261695405058555924/317126cc0b5694cae92f873fccd9cfa3.png?size=4096',
            },
            title: "Bir hata oluştu",
            footer: {
                icon_url: 'https://cdn.discordapp.com/avatars/867073097876897802/4377ec22766b174a7d20ba340a081cfd.png?size=4096',
                text: 'Created By cheystm',
            }
        }
    }
};