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
