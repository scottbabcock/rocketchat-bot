import { IMessage } from '@rocket.chat/sdk/dist/config/messageInterfaces';

export interface ICommand {
	name: string;
	description: string;
	parameters?: string[];
	usage?: string[];
	command: (message: IMessage, room: string) => Promise<void>;
}