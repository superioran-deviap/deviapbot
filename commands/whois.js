module.exports = {
	name: 'whois',
    description: 'Who is this person?',
    aliases: ['w', 'who'],
	execute(client, message, args) {
        message.delete();
        const { MessageEmbed } = require('discord.js')
        const { modInTraining, staffRole } = require('../config.json')
		if (!args.length) {
            const user = message.author;
            const member = message.guild.member(user);
            const userInfo = new MessageEmbed()
                .setColor(member.displayHexColor)
				.setTitle('User Info')
                .setAuthor(member.user.tag)
                .setThumbnail(user.displayAvatarURL())
				.setDescription('Information about ' + member.toString() + ' can be found in the fields below.')
				.addField('Your Username', member.toString(), true)
				.addField('Your User ID', member.id)
                .addField('Member Data:', 'The following section displays members in various states.')
				.setTimestamp()
				.setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
            // Special recognition
            if (member.roles.cache.some(role => role.id === staffRole)) {
                 userInfo.addField('Special Note:', 'This user is a Vulcan Staff Member!') 
            } else if (member.roles.cache.some(role => role.id === modInTraining)){
                userInfo.addField('Special Note:', 'This user is a Moderator in Training!') 
            } 
            userInfo.addField('Join Date:', member.joinedAt)
            // client status
            if (member.presence.clientStatus.web){
                userInfo.addField('Discord Presence:', '🌐 Web', true )
            } else if (member.presence.clientStatus.mobile){
                userInfo.addField('Discord Presence:', '📱 Mobile', true)
            } else if (member.presence.clientStatus.desktop){
                userInfo.addField('Discord Presence:', '🖥️ Desktop', true )
            }

            // status
            if (member.presence.status === 'online'){
                userInfo.addField('Discord Status:', `🟢 ${member.presence.status}`, true )
            } else if (member.presence.status === 'idle'){
                userInfo.addField('Discord Status:', `⏰ ${member.presence.status}`, true )
            } else if (member.presence.status === 'offline'){
                userInfo.addField('Discord Status:', `👻 ${member.presence.status}`, true)
            } else if (member.presence.status === 'dnd'){
                userInfo.addField('Discord Status:', `🛑 ${member.presence.status}`, true )
            }

            userInfo.addField(`Roles [${member.roles.cache.size}]`, member.roles.cache.map(role => role.toString()).join(', '))
            message.channel.send({embed: userInfo});
        } else if (2 > args.length > 0 ){
            const user = message.mentions.users.first();
            const member = message.guild.member(user);
            const userInfo = new MessageEmbed()
                .setColor(member.displayHexColor)
				.setTitle(member.username + ' Info')
                .setAuthor(`<@!${member.id}>`)
                .setImage(user.displayAvatarURL({ format: "png", dynamic: true }))
				.setDescription('Information about ' + member.toString() + ' can be found in the fields below.')
				.addField('Your Username', member.toString(), true)
				.addField('Your User ID', member.id)
                .addField('Member Data:', 'The following section displays members in various states.')
				.setTimestamp()
				.setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
            // Special recognition
            if (member.roles.cache.some(role => role.id === staffRole)) {
                 userInfo.addField('Special Note:', 'This user is a Vulcan Staff Member!') 
            } else if (member.roles.cache.some(role => role.id === modInTraining)){
                userInfo.addField('Special Note:', 'This user is a Moderator in Training!') 
            } 
            
            // client status
            if (member.presence.clientStatus.web){
                userInfo.addField('Discord Presence:', '🌐 Web', true )
            } else if (member.presence.clientStatus.mobile){
                userInfo.addField('Discord Presence:', '📱 Mobile', true)
            } else if (member.presence.clientStatus.desktop){
                userInfo.addField('Discord Presence:', '🖥️ Desktop', true )
            }

            // status
            if (member.presence.status === 'online'){
                userInfo.addField('Discord Status:', `🟢 ${member.presence.status}`, true )
            } else if (member.presence.status === 'idle'){
                userInfo.addField('Discord Status:', `⏰ ${member.presence.status}`, true )
            } else if (member.presence.status === 'offline'){
                userInfo.addField('Discord Status:', `👻 ${member.presence.status}`, true)
            } else if (member.presence.status === 'dnd'){
                userInfo.addField('Discord Status:', `🛑 ${member.presence.status}`, true )
            }

            userInfo.addField(`Roles [${member.roles.cache.size}]`, member.roles.cache.map(role => role.toString()).join(', '))
            message.channel.send({embed: userInfo});
        }
	},
};