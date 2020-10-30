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
        .addField('\u200b', '\u200b')
        .addField('**Invite your friends!**', '[Deviap Invite](https://discord.gg/AudGdds)')
        .setTimestamp()
        .setFooter(`Embedded by ${client.user.username}`, client.user.displayAvatarURL())
        return deviapInfo;
}

// Support
module.exports.serverSupport = (client) => {
    const supportInfo = new MessageEmbed()
        .setColor('#6767ce')
        .setTitle('Support and Assistance')
        .setDescription('Hello! 👋\n\nTo help make it easier to receive a response to your support ticket, we only allow you to ask for support through the official Deviap support email, listed below. We offer support through your individual ticket so that we can clearly communicate with you. Use the ticket to ask any questions, offer us great ideas about the platform, or let us know if you are experiencing an issue with our product.')
        .addField('I have an open ticket, but I did not get a response!', 'Please ensure that your mailbox is not marking Deviap as Spam. Additionally, check your Junk or Spam folder!')
        .addField('Contact us!', '**support@deviap.com**')
        .setTimestamp();
        return supportInfo;
}
// Rules
module.exports.serverRules = (client) => {
    const deviapRules = new MessageEmbed()
        .setColor('#6767ce')
        .setTitle('Community Rules')
        .setDescription('The following rules are not exhaustive of all scenarios. Use common sense when interacting with others.')
        .addField('**1. No Hate Speech**', 'Hate speech in any form is not tolerated, whether spoken in a Voice channel or sent as "User Generated Content" (messages or custom statuses). ')
        .addField('**2. No Harassment**', 'Do not harass any member of the community for any reason. No means no.')
        .addField('**3. No Advertising**', 'Do not advertise anything or solicit invitations to members through UGC (messages sent in DMs or here, custom statuses, or interactions in a Voice Channel).')
        .addField('**4. No Inappropriate Content**', 'Inappropriate content (NSFW/L content) is not allowed at all in Deviap, including UGC (as defined previously).')
        .addField('**5. No Spam / Copypasta**', 'Spamming messages, flooding channels, or sending chainmail is not allowed.')
        .setTimestamp();
        return deviapRules;
}
