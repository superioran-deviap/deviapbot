const config = require('../config.json');
module.exports = {
    name: "eval",
    cooldown: 10,
    aliases: ['e'],
    description: "Evaluates JS Code",
    execute(client, message, args) {
        const {noPerms} = require('../commands/response.js')
        // Blocks mentions
        function clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
        }
        // Gotta be Owner
        if (message.author.id !== config.owner) {
            message.channel.send({ embed: noPerms(client) }); 
            return;
        };
        
        try {
            const code = args.join(" ");
            let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
}