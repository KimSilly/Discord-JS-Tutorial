const figlet = require('figlet');

module.exports = {
    name: "글자",
    description: "영어 -> 기호",

    async run (client, message, args) {
        if(!args[0]) return message.channel.send('바꿀 영어나 숫자, 기호를 입력 해주세요');

        messages = args.join(" ");

        figlet.text(messages, function(err, data) {
            if(err){
                console.log(err);
            }
            if(data.length > 2000) return message.channel.send('2000자 미만의 글자를 입력 해주세요');

            message.channel.send('```'+ data + '```')
        })
    }
}