import { driver } from '@rocket.chat/sdk';
import dotenv from 'dotenv';

import { getCommandHandler } from './commands/CommandHandler';

dotenv.config();

const {
	ROCKETCHAT_URL,
	ROCKETCHAT_USER,
	ROCKETCHAT_PASSWORD,
	ROCKETCHAT_USE_SSL,
	BOT_PREFIX,
	BOT_ROOM
} = process.env;

if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD || !BOT_PREFIX || !BOT_ROOM) {
	console.error('Missing required environment variables.');
	process.exit(1);
}

(async () => {
	// Connect to server and login.
	await driver.connect({ host: ROCKETCHAT_URL, useSsl: !!ROCKETCHAT_USE_SSL });
	await driver.login({ username: ROCKETCHAT_USER, password: ROCKETCHAT_PASSWORD });

	// Join rooms and send welcome message.
	await driver.joinRooms([BOT_ROOM]);
	await driver.subscribeToMessages();
	driver.reactToMessages(getCommandHandler({ prefix: BOT_PREFIX }));
	await driver.sendToRoom("I'm alive!", BOT_ROOM);
})();