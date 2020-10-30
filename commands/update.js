module.exports = {
    name: 'update',
    aliases: ['upd', 'new'],
    description: 'Update channels',
    guildOnly: true,
	execute(client, message, args) {
        const { forbiddenPerms, serverInfo, serverSupport, serverRules }= require('../commands/response.js')
        const infoChannel = client.channels.cache.get('745281538920546327')
        const supportChannel = client.channels.cache.get('770930852833919007')
        const ruleChannel = client.channels.cache.get('745281654825812128')
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])

        if(!member) { 
            member = message.member;
        }
	if (member.roles.cache.some(role => role.name === 'Administrator')){
		if(args.length > 1){
		    message.delete()
		    message.reply('Too many arguments!')
		}
		else if(!args.length){
		    message.delete()
		    message.reply('Not enough arguments!')
		}
		else if(args[0] === 'info'){
		    message.delete()
		    infoChannel.send({embed: serverInfo(client)})
		}
		else if(args[0] === 'support'){
		    message.delete()
		    supportChannel.send({embed: serverSupport(client)})
		}
		else if(args[0] === 'rules'){
		    message.delete()
		    ruleChannel.send({embed: serverRules(client)})
		}
	} else if (!member.roles.cache.some(role => role.name === 'Administrator'))
		message.channel.send({embed: forbiddenPerms(client, message)})
    }
}
