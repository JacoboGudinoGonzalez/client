import { Component, OnInit } from '@angular/core';
import { ImpoService } from '../../services/impo.service';

@Component({
  selector: 'app-impo',
  templateUrl: './impo.component.html'
})
export class ImpoComponent implements OnInit {

  constructor(
    private _impoService: ImpoService
  ) { }

  ngOnInit() {
    this.getCounters();
  }


  getCounters() {
		this._impoService.register().subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		)
	}

}
