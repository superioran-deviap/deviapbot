module.exports = {
    name: 'ping',
    aliases: ['pong', 'test', 'speedtest', 'st', 'lag', 'latency', 'stupidbot'],
    description: 'Ping!',
    guildOnly: true,
	execute(client, message, args) {
        const { MessageEmbed } = require('discord.js');
		async function latency() {
			const m = await message.channel.send('Gathering info about message latency and API latency.');
			const messageMath = m.createdTimestamp - message.createdTimestamp;
			const ping = new MessageEmbed()
				.setColor('#33FF55')
                .setTitle('🏓 Ping')
                .setThumbnail(client.user.displayAvatarURL())
				.setAuthor(client.user.tag)
				.addField('Message latency:', messageMath + ' ms')
				.addField('API latency:', client.ws.ping + ' ms')
				.setTimestamp()
				.setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
            await message.delete();
			await message.channel.send(ping);	
		}
        latency();
	},
};