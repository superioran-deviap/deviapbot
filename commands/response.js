// Require the MessageEmbed Constructor
const { MessageEmbed } = require('discord.js');


// No permissions
module.exports.forbiddenPerms = (client) => {
    const noPerms = new MessageEmbed()
        .setColor('#FF4233')
        .setTitle('403: PERMISSION FORBIDDEN')
        .setImage(message.author.displayAvatarURL())
		.setAuthor(client.user.tag)
        .setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL())
        .addField('Explanation: ', 'Critical command usage failure!\n\nReason:' + message.author + ' does not have permission to run this command.')
        .setDescription('Failed to execute command.');
    return noPerms;
};

// User not found
module.exports.invalidUser = (client) => {
    const userInvalid = new MessageEmbed()
        .setColor('#FF4233')
		.setTitle('406: REQUEST INVALID')
		.setAuthor(client.user.tag)
		.setFooter('Embedded by ' + client.user.username, client.user.displayAvatarURL())
        .addField('Explanation: ', 'Attempting to perform this action failed!\n\n*Reason: Not a valid user.*');
    return userInvalid;
};

// Information
module.exports.serverInfo =  (client) => {
    const deviapInfo = new MessageEmbed()
        .setColor('#6767ce')
        .setTitle('About Deviap')
        .setDescription('Hi there! Welcome to the official Deviap Discord server. In this server, you can engage with other community members and stay up to date on the latest Deviap news.')
        .addField('Rules', 'In the <#760593027734569050> you can find a list of rules that you must follow in this server. If you don’t follow them then you have to face consequences.')
        .addField('Bulletin', 'The <#760593042742313000> contains announcements and important updates related to Deviap')
        .addField('Support', 'Need help? Check out the <#760592899351379998> channel for how to reach us!')
        .addField('Miscellaneous', 'Please be sure to read channel descriptions for other channels.')
        .setTimestamp();
        return deviapInfo;
}
