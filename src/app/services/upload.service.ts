import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, token:string, name: string){
		return new Promise(function(resolve, reject){
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			if(files!=undefined){
				for(var i = 0; i < files.length; i++){
					formData.append(name, files[i], files[i].name);
				}
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
		  	xhr.setRequestHeader('Authorization', token);
			xhr.setRequestHeader('enctype', 'multipart/form-data');
			xhr.send(formData);
		});
	}

}