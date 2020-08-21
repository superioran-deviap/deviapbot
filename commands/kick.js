module.exports = {
    name: 'kick',
    aliases: ['k', 'tempban'],
    description: 'Kick!',
    guildOnly: true,
	execute(client, message, args) {
        const { MessageEmbed, Permissions } = require('discord.js')
        const { forbiddenPerms, invalidUser} = require('../commands/response.js')
        const flags = [
            'KICK_MEMBERS',
            'BAN_MEMBERS'
        ];
        const botPowers = [
            'KICK_MEMBERS',
            'BAN_MEMBERS',
            'ADMINISTRATOR'
        ]
        const { modLog, prefix } = require('../config.json')
        const user = message.mentions.users.first();
        const member = message.guild.member(user)
        const kicker = message.author;
        const moderator = message.guild.member(kicker);
        const usage = new MessageEmbed()
            .setColor('#4ABDF6')
            .setTitle('Kick Command')
            .setAuthor(client.user.tag)
            .setThumbnail(client.user.displayAvatarURL())
			.addField('Command Usage:', '!kick ' + kicker.username)
			.addField('Result:', 'If I have permission, I will kick the tagged user and send them the added reason.')
			.addField('Documentation:', '[Full Documentation](https://superioran-rblx.gitbook.io/goosebot-documentation/)', true)
			.addField('Support Server:', '[Join Support Server](https://discord.gg/py87FjA)', true)
			.setTimestamp()
            .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
        async function kick() {
            // No arguments given, provide usage
        if ((args.length < 1) && moderator.hasPermission(flags)) {
            message.channel.send({ embed: usage })
        }
            // No permissions, return error.
        if ((args.length > 1) && !moderator.hasPermission(flags)) {
            
            message.channel.send({ embed: forbiddenPerms(client) })
        }
        if (!member && args.length >= 1) {
            message.channel.send({embed: invalidUser(client)})
        }

            //Check if user mention and permissions are right.
        if ((!user || user ) && (moderator.hasPermission(flags)) && args.length) {
            if(user){
            if ((member.kickable)) {
                const arguments = message.content.substring(prefix.length + user.length).split(' ').slice(2);
                const kickReason = arguments.join(' ');
                const noReason = "No reason was given";
                if (kickReason) {
                const kickSuccess = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`👢 ${user.tag} Kicked Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(kicker.tag)
                .setDescription(`${user.tag} was kicked by ${kicker}.\n**Reason: ${kickReason}**`)
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const kickLog = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`👢 ${user.tag} Kicked Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(kicker.tag)
                .setDescription(`${user.tag} was kicked by ${kicker}.\n**Reason: ${kickReason}**`)
                .addField('User ID:', user.id)
                .addField('Roles', member.roles.cache.map(role => role.toString()).join(', '))
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
                
                const kicked = new MessageEmbed()
                .setColor('#F03A1E')
                .setTitle(`**You've been kicked.**`)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor(client.user.tag)
                .setDescription(`${user}, you were kicked from ${message.guild.name}.\n**Reason: ${kickReason}**`)
                .setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                    message.channel.send({ embed: kickSuccess });
                    member.send(kicked).then(function(){
                        member.kick({reason: `${kickReason}`});
                    }).catch(function(){
                        member.kick({reason: `${kickReason}`})
                    });
                    client.channels.cache.get(modLog).send({embed: kickLog})
                }
                if(!kickReason){
                    const kickSuccess = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`👢 ${user.tag} Kicked Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(kicker.tag)
                .setDescription(`${user.tag} was kicked by ${kicker}.\n**Reason: ${noReason}**`)
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const kickLog = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`👢 ${user.tag} Kicked Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(kicker.tag)
                .setDescription(`${user.tag} was kicked by ${kicker}.\n**Reason: ${noReason}**`)
                .addField('User ID:', user.id)
                .addField('Roles', member.roles.cache.map(role => role.toString()).join(', '))
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const kicked = new MessageEmbed()
                .setColor('#F03A1E')
                .setTitle(`**You've been kicked.**`)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor(client.user.tag)
                .setDescription(`${user}, you were kicked from ${message.guild.name}.\n**Reason: ${noReason}**`)
                .setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                    message.channel.send({ embed: kickSuccess });
                    member.send(kicked).then(function(){
                        member.kick({reason: `${noReason}`});
                    }).catch(function(){
                        member.kick({reason: `${noReason}`})
                    });
                    client.channels.cache.get(modLog).send({embed: kickLog})
                }
            }
        }
            if ((!member.kickable)){
                const kickFail = new MessageEmbed()
                .setColor('#FF4233')
                .setTitle('401: BAD REQUEST')
                .setAuthor(client.user.tag)
                .setDescription('Failed to kick user.')
                .addField('Explanation:', `Attempting to kick ${member.tag} failed!\n\nReason: User is not kickable or there was another issue.`)
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
                message.channel.send({ embed: kickFail });
            }
        }
        await message.delete();
        }
        kick();
    },
};
