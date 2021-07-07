import { IMessage } from '@rocket.chat/sdk/dist/config/messageInterfaces';

export interface ICommand {
	name: string;
	description: string;
	command: (message: IMessage, room: string) => Promise<void>
}