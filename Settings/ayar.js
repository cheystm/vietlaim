module.exports = {
    Register: { //Register ayarları
        erkekrol: [""], //Erkek rollerin id
        kizrol: [""], //Kız rollerin id
        kayıtsızrol: [""], //Kayıtsız rollerin id
        karantina: "", //Yeni hesap rol id
        boosterrol: "", //Booster rol id
        viprol: "", //V.I.P. rol id
        tagrol: "", //Tag rol id
        hgkanal: "", //Hoşgeldin kanal id
        teyitcirol: "", //Kayıt yetkili rol id
        tag: "", //Tag sembol
        tagsız: "", //Tagsız sembol
        taglog: "", //Tag log kanal id
        ytaglog: "", //Yasaklı tag log kanal id
        ytags: [""], //Yasaklı taglar
        ytagrol: "", //Yasaklı tag rol id
        genelchat: "" //Karşılama kanal id
    },
    Moderasyon: { //Moderasyon ayarları
        yetkilirol: { //Yetkili rolleri
            ban: ["1259609100292063282"], //Ban yetkili rollerin id
            jail: [""], //Jail yetkili rolleri id
            sesmute: ["1259609106403168377"], //Ses mute yetkili rolleri id
            textmute: ["1259609106403168377"], //Text mute yetkili rolleri id
        },
        logkanal: { //Log kanalları
            ban: "1261756997942902896", //Ban log kanal id
            jail: "1261756997942902896", //Jail log kanal id mute kanal aynı
            sesmute: "1261756997942902896", //Ses mute log kanal id
            textmute: "1261756997942902896", //Text mute log kanal id
            clear: "1261756997942902896"
        },
        cezarol: { //Ceza rolleri
            jail: "", //Jail rol id
            unjail: "", //Unjail rol id
            textmute: "1261863748134764626" //Textmute rol id
        }
    },
    Genel: {
        botrol: "", //Bot oto rol id
        infoemoji: {
            yes: "", //Yes emoji id
            no: "", //No emoji id
        },
        invitelog: "" //Davet log kanalı
    }
};
