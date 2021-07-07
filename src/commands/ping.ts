import { driver } from '@rocket.chat/sdk';

import { ICommand } from '../interfaces/ICommand';

export const ping: ICommand = {
	name: 'ping',
	description: 'Pings the bot.',
	command: async (_message, room) => {
		await driver.sendToRoom('Pong!', room);
	}
}