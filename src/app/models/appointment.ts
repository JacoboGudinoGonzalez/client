import { User } from './user';

export class Appointment{
	constructor(
		public id: string,
		public service: number,
		public fromDate: Date,
		public toDate: Date,
		public fromUser: User,
		public toUser: User
	){
		
	}
}