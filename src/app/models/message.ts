import { User } from './user';

export class Message{
	constructor(
		public id: string,
		public text: string,
		public viewed: string,
		public createdAt: Date,
		public emmiter: User,
		public receiver: User
	){
		
	}
}