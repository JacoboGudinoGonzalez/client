import { User } from './user';

export class Message{
	constructor(
		public id: string,
		public text: string,
		public viewed: string,
		public created_at: Date,
		public emitter: User,
		public receiver: User
	){
		
	}
}