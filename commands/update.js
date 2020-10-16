module.exports = {
    name: 'update',
    aliases: ['upd', 'new'],
    description: 'Update channels',
    guildOnly: true,
	execute(client, message, args) {
        const { serverInfo, serverSupport, serverRules }= require('../commands/response.js')
        const infoChannel = client.channels.cache.get('766712471230611527')
        const supportChannel = client.channels.cache.get('760592899351379998')
        const ruleChannel = client.channels.cache.get('760593027734569050')
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
            infoChannel.bulkDelete(3).then(
            infoChannel.send({embed: serverInfo(client)}))
        }
        else if(args[0] === 'support'){
            message.delete()
            supportChannel.send({embed: serverSupport(client)})
        }
        else if(args[0] === 'rules'){
            message.delete()
            ruleChannel.send({embed: serverRules(client)})
        }
    }
}
