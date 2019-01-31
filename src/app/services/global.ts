import { Router } from '@angular/router';

export var GLOBAL = {
	url: 'http://localhost:8081/petProject/rest/',
	
	unauthorized(errorMessage, token){
		console.log("errorMessage: "+errorMessage)
		if(errorMessage.status != undefined){
			if (errorMessage.status == 401 || token ==null){
				localStorage.clear();
				return true;
			}
			return true;
		}	
		return true;
	},

	verifyIdentity(identity){
		if(identity==null){
			return true;
		}
	}
}