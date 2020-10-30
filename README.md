# deviapbot

This is an open-source Discord bot using the Discord.js library.

## structure

This bot uses a command handler and file system as a structure. `bot.js` is the main file that is initialized when hosted and the commands are within the `/commands/` directory. For the most part, the files are named with brevity, such as `responses.js` -- it's pretty clear that responses are in this file.

As a warning, this bot uses **Privileged Intents**, meaning it tracks presence and members within a guild or server. Some of this data includes user status or whether a member is online/offline/idle/do not disturb. This is publicly accessible due to the way Discord has opened up their API to developers. We do not store any user data whatsoever (there's no database!) through this bot.


## commands

We have only a few commands at the moment:
- Ban (ban a target user if you and the bot have permission to do so)
- Eval (evaluate an argument (must be the bot owner))
- Kick (temporarily remove a member from the server if you and the bot have permission to do so)
- Ping (check the message and API latency)
- Update (send one of a few options to a channel, must hold a privileged role)
- Whois (get information about a user or yourself)
