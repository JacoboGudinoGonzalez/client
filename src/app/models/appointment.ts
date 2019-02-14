import { User } from './user';
import { Pet } from './pet';

export class Appointment{
	constructor(
		public id: string,
		public service: number,
		public fromDate: Date,
		public toDate: Date,
		public fromUser: User,
		public toUser: User,
		public pet: Pet,
		public status: string
	){
		
	}
}