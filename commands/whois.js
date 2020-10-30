module.exports = {
	name: 'whois',
	description: 'Who is this person?',
	aliases: ['who'],
	usage: '[!whois]',
	execute(client, message, args) {
        // Get Discord Embed
        const Discord = require('discord.js')
        // Get User!
        const user = message.author
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])

        if(!member) { 
            member = message.member;
        }

        const perms = member.permissions.toArray().map(p => p.split('_').map(v => v.split('').map((c, i) => !i ? c.toUpperCase() : c.toLowerCase()).join('')).join(' ')).reduce((p, c, i, a) => {
            if (i === 0) return c;
            if (i === (a.length - 1)) return `${p}, and ${c}`;
            return `${p}, ${c}`;
          }, '')

        // Function!
        async function userInfo(){
                const info = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('User Information')
                .setDescription(`Here's all the information I have on ${member.user.username}.`)
                .setAuthor(member.user.tag)
                .setThumbnail(member.user.displayAvatarURL())
                .addField('Username', member.user.username)
                .addField('Discord ID', member.id)
                .addField('Join Date', member.joinedAt)
                .addField('Presence Details', `Information about the user's presence can be found below.`)

                // Status Type
                if (member.presence.status === 'online'){
                    info.addField('Discord Status:', `🟢 Online`, true )
                } else if (member.presence.status === 'idle'){
                    info.addField('Discord Status:', `⏰ Idle`, true )
                } else if (member.presence.status === 'offline'){
                    info.addField('Discord Status:', `👻 Offline`, true)
                } else if (member.presence.status === 'dnd'){
                    info.addField('Discord Status:', `🛑 Do Not Disturb`, true )
                }

                // Client Type
                if(member.presence.status != "offline"){
                    if (member.presence.clientStatus.web){
                    info.addField('Device:', '🌐 Web', true)
                    } else if (member.presence.clientStatus.mobile){
                    info.addField('Device:', '📱 Mobile', true)
                    } else if (member.presence.clientStatus.desktop){
                    info.addField('Device:', '🖥️ Desktop', true)
                    }
                } if (member.presence.status === "offline"){
                    info.addField('Device:', `*No presence detected*`, true)
                }
                info.addField('\u200b', '\u200b', true)
                // Custom Status Detection
                let activities
                if (member.presence.activities.length >= 1){
                    activities = member.presence.activities[0].name;
                    info.addField('Activity', activities, true)
                    if (member.presence.activities[0].type === "CUSTOM_STATUS"){
                    info.addField('Custom Status', `${member.presence.activities[0].emoji} ${member.presence.activities[0].state}`, true)
                    }
                    if (member.presence.activities[0].type === "WATCHING"){
                        info.addField('Watching', `${member.presence.activities[0].name}`, true)
                    }
                    if (member.presence.activities[0].type === "PLAYING"){
                        info.addField('Playing', `${member.presence.activities[0].name}`, true)
                    }
                    if (member.presence.activities[0].type === "STREAMING"){
                        info.addField('Streaming', `${member.presence.activities[0].name}`, true)
                    }
                    if (member.presence.activities[0].type === "LISTENING"){
                        info.addField('Listening', `${member.presence.activities[0].name}`, true)
                    }
                    if (member.presence.activities[0].type === "COMPETING"){
                        info.addField('Competing', `${member.presence.activities[0].name}`, true)
                    }
                    info.addField('\u200b', '\u200b', true)
                }
                if (member.presence.activities.length < 1){
                    activities = 'None';
                    info.addField('Activity / Status:', activities)
                }
                info.addField('\u200b', '\u200b')

                let roleList
                if(member.roles.cache.size > 8){
                    roleList = `*Too many to list*`
                }
                else if (member.roles.cache.size <= 8){
                    roleList = member.roles.cache.map(role => role.toString()).join(', ')
                }
                info.addField(`Roles [${member.roles.cache.size}]`, roleList )
                info.addField(`Permissions`, perms)
                info.setTimestamp()
                info.setFooter(`Embedded by ${client.user.username}`, client.user.displayAvatarURL())
                message.channel.send({embed: info})
            await message.delete()
        } userInfo();
    }
}
