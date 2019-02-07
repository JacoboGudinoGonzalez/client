import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("appointments cargado");
  }

}
