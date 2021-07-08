import { ICommand } from '../interfaces';
import { help } from './help';
import { ping } from './ping';

export const CommandList: ICommand[] = [
	help,
	ping
];