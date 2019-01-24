export class ServicePet{
	constructor(
        public idUserFrom: number,
        public idUserTo: number,
        public dateFrom: Date,
        public dateTo: Date,
        public address: string,
        public message: string
	){
		
	}
}