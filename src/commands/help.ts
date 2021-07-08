import { driver } from '@rocket.chat/sdk';

import { CommandList } from '.';
import { BOT } from '../bot';
import { ICommand } from '../interfaces';

export const help: ICommand = {
	name: 'help',
	description: `Lists information on the bot's list of commands.`,
	parameters: ['?command'],
	usage: [
		"`{prefix} help` - will return a list of commands.",
		"`{prefix} help ?command` - will return a detailed description of that command.",
	],
	command: async (message, room) => {
		const [query] = message.msg!.split(" ").slice(2);
		await driver.sendToRoom(getResponse(query), room);

		function getResponse(query: string): string {
			if (!query) {
				const commandList: string[] = CommandList.map(command => `\`${BOT.prefix} ${command.name}\`: ${command.description}`);
				return `Hello! I am chat bot created for this server! Here is the list of available commands:\n${commandList.sort().join('\n')}`;
			}

			const targetCommand = CommandList.find(command => command.name === query);
			if (!targetCommand) {
				return `I'm sorry, but I do not have a \`${query}\` command.`;
			}

			return getCommandResponse(targetCommand);
		}

		function getCommandResponse(command: ICommand): string {
			let response = `*Information on my \`${command.name}\` command:*
_Description_
${command.description}`;

			if (command.parameters?.length) {
				response += `

_Parameters_
${command.parameters?.join(" ") ?? "none"}`;
			}

			if (command.usage?.length) {
				response += `

_Example Uses_
${command.usage?.map((use) => use.replace(/\{prefix\}/g, BOT.prefix)).join("\n")}`;
			}

			return response;
		}
	}
};