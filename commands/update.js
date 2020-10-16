module.exports = {
    name: 'update',
    aliases: ['upd', 'new'],
    description: 'Update',
    guildOnly: true,
	execute(client, message, args) {
        const { deviapInfo }= require('../commands/response.js')
        const infoChannel = client.channels.get('766712471230611527')
        if(args.length > 1){
            message.delete()
            message.reply('Too many arguments!')
        }
        else if(args.length < 1){
            message.delete()
            message.reply('Not enough arguments!')
        }
        else if(args[0] === 'info'){
            message.delete()
            infoChannel.send({embed: deviapInfo(client)})
        }
    }
}
