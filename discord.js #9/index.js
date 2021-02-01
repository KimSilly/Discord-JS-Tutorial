const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();

const prefix = '튜브야 ' //자신의 프리픽스


const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));
// 커맨드 파일 불러오는 구문들
for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
  let commands = file.split(".")[0];
  console.log('Loading Commands: ' + commands)
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`${client.users.cache.size}명`) // 봇을 사용 하고있는 모든 유저
  console.log(`${client.guilds.cache.size}개로`) //봇이 참가해있는 모든 서버 표시
  console.log(`${client.user.tag}로 로그인 성공!`);
  client.user.setActivity('//help by KIMSILLY') //상태메시지
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on('message', async message => {
  const args = message.content.substring(prefix.length).split(' ')


  if(message.content.startsWith(`${prefix}투표`)) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('관리자 권한을 가진 사람만 이 명령어를 실행 할 수 있습니다')

    const vote = args.slice(1).join(' ')

    const regex = vote.match(/"[^"]+"|[\\S]+"[^"]+/g)

    if(regex.length > 10) {
      return message.channel.send('최대 9개까지만 투표 할 수 있습니다')
    }

    let str = ''
    
    let emoji = [
      '1️⃣',
      '2️⃣',
      '3️⃣',
      '4️⃣',
      '5️⃣',
      '6️⃣',
      '7️⃣',
      '8️⃣',
      '9️⃣'
    ]

    let i = 0

    for (const poll of regex) {
      str = str + `${emoji[i]} ${poll}\n\n`
      i++
    }

    const a = new Discord.MessageEmbed()
    .setDescription(str.replace(/"/g, ''))

    const msg = await message.channel.send(a)

    for (let i = 0; i < regex.length; i++) {
      msg.react(emoji[i])
    }

    message.delete();
  }
})

client.login(token);