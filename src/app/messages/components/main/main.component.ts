import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})

export class MainComponent{
    public title:string;

    constructor(){
        this.title = 'Mensages privados';
    }

    ngOnInit(){
        console.log("componente main cargado");
    }
}