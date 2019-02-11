import { Component } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})

export class MainComponent{
    public title:string;

    constructor(){
        this.title = 'Citas';
    }

    ngOnInit(){
        console.log("componente main cargado");
    }
}