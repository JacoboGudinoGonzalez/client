import { User } from './user';

export class Pet{
	constructor(
		public id: string,
		public owner: User,
		public type: number,
		public name: string,
		public gender: number,
		public size: number,
		public years: number
	){
		
	}
}		