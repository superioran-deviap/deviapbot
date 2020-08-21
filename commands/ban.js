module.exports = {
    name: 'ban',
    aliases: ['b', 'permban'],
    description: 'Ban!',
    guildOnly: true,
	execute(client, message, args) {
        const { MessageEmbed, Permissions } = require('discord.js')
        const { forbiddenPerms, invalidUser }= require('../commands/response.js')
        const flags = [
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
        const banner = message.author;
        const moderator = message.guild.member(banner);
        async function ban() {
        if ((args.length < 1) && moderator.hasPermission(flags)) {
            const usage = new MessageEmbed()
            .setColor('#4ABDF6')
            .setTitle('Ban Command')
            .setAuthor(client.user.tag)
            .setThumbnail(client.user.displayAvatarURL())
			.addField('Command Usage:', `${prefix}ban ${banner.username}`)
			.addField('Result:', 'If I have permission, I will ban the tagged user and send them the added reason.')
			.addField('Documentation:', '[Full Documentation](https://superioran-rblx.gitbook.io/goosebot-documentation/)', true)
			.addField('Support Server:', '[Join Support Server](https://discord.gg/py87FjA)', true)
			.setTimestamp()
            .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
            message.channel.send({ embed: usage })
        }
        if ((args.length > 1) && !moderator.hasPermission(flags)) {
            
            message.channel.send({ embed: forbiddenPerms(client) })
        }
        // If the mentioned user is not a member, send the error.
        if (!member && !args.length >= 1) {
            message.channel.send({embed: invalidUser(client)})
        }
        if ((args.length >= 1) && (moderator.hasPermission(flags)) && client.user.hasPermission(botPowers)) {
            if ((member.bannable)) {
                const arguments = message.content.substring(prefix.length + user.length).split(' ').slice(2);
                const banReason = arguments.join(' ');
                const noReason = "No reason was given";
                if (banReason) {

                const banSuccess = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`${user.tag} Banned Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(banner.tag)
                .setDescription(`${user.tag} was banned by ${banner}.\n**Reason: ${banReason}**`)
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const banLog = new MessageEmbed()
				.setColor('#87F276')
                .setTitle(`${user.tag} Banned Successfully`)
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(banner.tag)
                .setDescription(`${user.tag} was banned by ${banner}.\n**Reason: ${banReason}**`)
                .addField('User ID:', user.id)
                .addField('Roles', member.roles.cache.map(role => role.toString()).join(', '))
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const banned = new MessageEmbed()
				.setColor('#F03A1E')
                .setTitle(`**You've been banned.**`)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor(client.user.tag)
                .setDescription(`${user}, you were banned from ${message.guild.name}.\n**Reason: ${banReason}**`)
				.setTimestamp()
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                    message.channel.send({ embed: banSuccess });
                    member.send(banned).then(function(){
                        member.ban({reason: `${banReason}`});
                    }).catch(function(){
                        member.ban({reason: `${banReason}`})
                    });
                    client.channels.cache.get(modLog).send({embed: banLog})
                }
                if(!banReason){
                    const banSuccess = new MessageEmbed()
                    .setColor('#87F276')
                    .setTitle(`${user.tag} Banned Successfully`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setAuthor(banner.tag)
                    .setDescription(`${user} was banned by ${banner}.\n**Reason: ${noReason}**`)
                    .setTimestamp()
                    .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const banLog = new MessageEmbed()
                    .setColor('#87F276')
                    .setTitle(`${user.tag} Banned Successfully`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setAuthor(banner.tag)
                    .setDescription(`${user.tag} was banned by ${banner}.\n**Reason: ${noReason}**`)
                    .addField('User ID:', user.id)
                    .addField('Roles', member.roles.cache.map(role => role.toString()).join(', '))
                    .setTimestamp()
                    .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                const banned = new MessageEmbed()
                    .setColor('#F03A1E')
                    .setTitle(`**You've been banned.**`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setAuthor(client.user.tag)
                    .setDescription(`${user.tag}, you were banned from ${message.guild.name}.\n**Reason: ${noReason}**`)
                    .setTimestamp()
                    .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());

                    message.channel.send({ embed: banSuccess });
                    member.send(banned).then(function(){
                        member.ban({reason: `${banReason}`});
                    }).catch(function(){
                        member.ban({reason: `${banReason}`});
                    });
                    client.channels.cache.get(modLog).send({embed: banLog})
                }
            }
            if ((!member.bannable)){
                const banFail = new MessageEmbed()
                .setColor('#FF4233')
                .setTitle('401: BAD REQUEST')
                .setAuthor(client.user.tag)
                .setDescription('Failed to ban user.')
                .addField('Explanation:', `Attempting to ban ${user} failed!\n\nReason: User is not bannable or there was another issue.`)
                .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL());
                message.channel.send({ embed: banFail });
            }
        }
        await message.delete();
        }
        ban();
    },
};