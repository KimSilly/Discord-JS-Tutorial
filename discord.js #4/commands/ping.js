//index.js 에는 쓰지 않고, commands 파일 안에서 파일을 계속 추가해
//커맨드를 만들겁니다. index.js 가 너무 어지러워져서 이렇게 파일을 추가하는 방식으로
//진행 할 예정 입니다!

const Discord = require('discord.js');

module.exports = {
    name: "ping", //여기에 자신이 원하는 명령어를 넣고
    description: "print server ping",

    async run (client, message, args) { //여기 안에 ping 이라는 명령어가 실행 되었을때 실행할 코드를 입력 해주시면 됩니다!

        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\`ms 입니다!`);

        
        message.channel.send(ping); //마지막에는 ping을 보냅니다
    }
}