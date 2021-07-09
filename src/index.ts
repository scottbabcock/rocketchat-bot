import { driver } from '@rocket.chat/sdk';
import dotenv from 'dotenv';

import { CommandHandler } from './commands';
import { IBot } from './interfaces';

dotenv.config();

const {
	ROCKETCHAT_URL,
	ROCKETCHAT_USER,
	ROCKETCHAT_PASSWORD,
	ROCKETCHAT_USE_SSL,
	BOT_NAME,
	BOT_PREFIX = '!bot'
} = process.env;
const ROOMS = (process.env.BOT_ROOMS || 'general').split(',');

if (!ROCKETCHAT_URL || !ROCKETCHAT_USER || !ROCKETCHAT_PASSWORD || !BOT_NAME) {
	console.error('Missing required environment variables.');
	process.exit(1);
}

// Global instance of bot for reference by commands.
export const BOT: IBot = {
	name: BOT_NAME,
	prefix: BOT_PREFIX,
};

// Starts the bot.
const runBot = async () => {
	// Connect to server and login.
	await driver.connect({ host: ROCKETCHAT_URL, useSsl: !!ROCKETCHAT_USE_SSL });
	await driver.login({ username: ROCKETCHAT_USER, password: ROCKETCHAT_PASSWORD });

	// Join rooms.
	await driver.joinRooms(ROOMS);
	await driver.subscribeToMessages();
	driver.reactToMessages(CommandHandler);

	// Send welcome messages.
	for (const room of ROOMS) {
		await driver.sendToRoom(`${BOT_NAME} is online. Use \`${BOT_PREFIX}\` to send commands.`, room);
	}
};

runBot();