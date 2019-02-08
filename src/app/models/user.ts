export class User{
	constructor(
		public id: string,
		public name: string,
		public email: string,
		public tel: string,
		public password: string,
		public image: string,
		public type: string,
		public rating: number,
		public description: string,
		public address: string
	){
		
	}
}