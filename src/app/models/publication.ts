import { Usuario } from './usuario';

export class Publication{
	constructor(
		public id: string,
		public text: string,
		public file: string,
		public createdAt: Date,
		public usuario: Usuario
	){
		
	}
}