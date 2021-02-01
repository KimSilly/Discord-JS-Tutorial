const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "코로나",
    description: "Track a country or worldwide COVID-19 cases",

    async run (client, message, args){

        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('You are missing some args')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`전세계 코로나-19 상황  🌎`)
                .addField('확진자', confirmed)
                .addField('치료됨', recovered)
                .addField('사망', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`**${countries}** 코로나-19 상황`)
                .addField('확진', confirmed)
                .addField('치료됨', recovered)
                .addField('사망', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('나라가 검색되지 않습니다')
            })
        }
    }
}