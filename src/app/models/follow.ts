import { Usuario } from './Usuario';

export class Follow{
	constructor(
		public id: string,
		public usuario: Usuario,
		public followed: Usuario
	){
		
	}
}