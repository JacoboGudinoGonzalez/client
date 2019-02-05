import { User } from './user';

export class Follow{
	constructor(
		public id: string,
		public usuario: User,
		public followed: User
	){
		
	}
}