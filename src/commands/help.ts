import { driver } from '@rocket.chat/sdk';

import { CommandList } from '.';
import { BOT } from '../bot';
import { ICommand } from '../interfaces';

export const help: ICommand = {
	name: 'help',
	description: `Lists information on the bot's list of commands.`,
	command: async (_message, room) => {
		const commandList: string[] = CommandList.map(command => `\`${BOT.prefix} ${command.name}\`: ${command.description}`);
		const response: string = `Hello! I am chat bot created for this server! Here is the list of available commands:\n${commandList.sort().join('\n')}`
		await driver.sendToRoom(response, room);
	}
}