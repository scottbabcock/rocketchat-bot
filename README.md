# RocketChat Bot

A simple chat bot built with the Rocket.Chat SDK. This project is based on the [freecodecamp tutorial](https://www.freecodecamp.org/news/how-to-build-a-rocketchat-bot-with-typescript/).

# Usage

## Production:

1. Create a .env

   ```txt
   ROCKETCHAT_VERSION=latest
   PORT=3000
   ROOT_URL=http://localhost:3000
   MONGO_URL=mongodb://urlforthedatabase:27017/rocketchat
   MONGO_OPLOG_URL=mongodb://urlforthedatabase:27017/local

   INSTANCE_IP=<ip of the local instance>

   INSTANCE_IP_ALPHA=<ip of the first instance>
   INSTANCE_IP_BRAVO=<ip of the other instance>

   BOT_NAME=<name of the bot>
   BOT_PREFIX=<prefix to trigger bot (optional, defaults to '!bot')>"

   ROCKETCHAT_ROOMS=<comma separated list of rooms (optional, defaults to 'general')>
   ROCKETCHAT_URL=http://localhost:3000
   ROCKETCHAT_USER=<bot username>
   ROCKETCHAT_PASSWORD=<bot user password>
   ROCKETCHAT_USE_SSL=<use SSL (optional, defaults to false)>
   ```

2. Replace the keys with required values

3. Run rocket-chat server

   ```console
   docker-compose config
   docker-compose up -d
   ```

## Developing locally:

1. `cp sample.env .env`
2. `docker-compose up -d`

This manages everything inside Docker (via `docker-compose.dev.yml`) including setting up a Mongo container and replica set.

# Commands

The bot currently has the following commands. Commands must be prefixed with `BOT_PREFIX` (defaults to '!bot').

- `help <?command>`: Returns a list of the bot's available commands, or a detailed description of the specific `command`.
- `ping`: Returns a message with the bot's response time in milliseconds.

# Adding a New Command

Adding a new command requires a few steps. First, create a new file in the `/src/commands` directory called `commandName.ts` (where `commandName` is the name of your command).

## Writing the Command

Commands use the same `ICommand` interface, which can be found in `src/interfaces/ICommand.ts`. A command should be exported to be accessed by the handler.

```ts
import { ICommand } from '../interfaces';

export const commandName: ICommand = {
   name: "The name of your command (used to call the command)",
   description: "A brief description of the command, displayed in the help commands.",
   parameters: ["required", "?optional", "...multi-word"], // Array of command parameters
   usage: [ // Example use cases ({prefix} is replaced with bot prefix automatically)
      "`{prefix} commandName required` - Does something",
      "`{prefix} commandName required ?optional` - Does something extra",
   ],
   command: async (message, room) => {
      /* Command logic will go here */
   }
```

## Importing the Command

Once you have written your command's logic, you will need to import that new command through the `/src/commands/_CommandList.ts` file. To the existing `CommandList` array, add your new `commandName` command.

```ts
import { ICommand } from '../interfaces';
import { help } from './help';
import { ping } from './ping';
import { commandName } from './commandName'; // <--This is where your command lives!

export const CommandList: ICommand[] = [
   help,
   ping,
   commandName // <--This is your command!
];
```