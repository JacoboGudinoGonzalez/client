import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

import { UserGuard } from '../services/user.guard';

const appointmentsRoutes: Routes = [
    {
        path: 'citas', 
        component: MainComponent,
        children: [
            { path: '', redirectTo:'recibidas', pathMatch:'full'},
            { path: 'recibidas', component: ReceivedComponent, canActivate:[UserGuard]},
            { path: 'recibidas/:page', component: ReceivedComponent, canActivate:[UserGuard]},
            { path: 'enviadas', component: SendedComponent, canActivate:[UserGuard]},
            { path: 'enviadas/:page', component: SendedComponent, canActivate:[UserGuard]},
            { path: 'enviar/:id', component: AddComponent, canActivate:[UserGuard]},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appointmentsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppointmentsRoutingModule {}