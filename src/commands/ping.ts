import { driver } from '@rocket.chat/sdk';

import { ICommand } from '../interfaces';

export const ping: ICommand = {
	name: 'ping',
	description: 'Returns a response from the bot with the ping time.',
	usage: ["`{prefix} ping` - will return the current response time."],
	command: async (_message, room) => {
		const start = Date.now();
		await driver.sendToRoom(`Pong!`, room);
		await driver.sendToRoom(`Response Time: ${Date.now() - start}ms`, room);
	}
}