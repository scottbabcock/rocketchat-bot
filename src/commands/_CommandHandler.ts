import { driver } from '@rocket.chat/sdk';
import { ICallback } from '@rocket.chat/sdk/dist/config/driverInterfaces';
import { IMessage } from '@rocket.chat/sdk/dist/config/messageInterfaces';

import { CommandList } from '.';
import { BOT } from '../bot';

export const CommandHandler: ICallback = async (err: unknown, ...messages: IMessage[]): Promise<void> => {
	if (err) {
		console.error(err);
		return;
	}

	const message = messages[0];
	if (!message?.msg || !message?.rid) {
		console.error('Invalid message received.', message);
		return;
	}

	const roomName = await driver.getRoomName(message.rid);
	const [prefix, commandName] = message.msg.split(' ');
	if (prefix !== BOT.prefix) {
		return;
	}

	for (const Command of CommandList) {
		if (commandName === Command.name) {
			await Command.command(message, roomName);
			return;
		}
	}
	await driver.sendToRoom(`I am sorry, but \`${commandName}\` is not a valid command.`, roomName);
};
