import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { InsertareditarinmuebleComponent } from './components/inmueble/insertareditarinmueble/insertareditarinmueble.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { InsertareditaractividadComponent } from './components/actividad/insertareditaractividad/insertareditaractividad.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { InsertareditarperfilusuarioComponent } from './components/perfilusuario/insertareditarperfilusuario/insertareditarperfilusuario.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { InsertareditargeolocalizacionComponent } from './components/geolocalizacion/insertareditargeolocalizacion/insertareditargeolocalizacion.component';
import { ZonadeteccionComponent } from './components/zonadeteccion/zonadeteccion.component';
import { InsertareditarzonadeteccionComponent } from './components/zonadeteccion/insertareditarzonadeteccion/insertareditarzonadeteccion.component';
import { DispositivoComponent } from './components/dispositivo/dispositivo.component';
import { InsertareditardispositivoComponent } from './components/dispositivo/insertareditardispositivo/insertareditardispositivo.component';
import { EventodispositivoComponent } from './components/eventodispositivo/eventodispositivo.component';
import { InsertareditareventodispositivoComponent } from './components/eventodispositivo/insertareditareventodispositivo/insertareditareventodispositivo.component';
import { ReconocimientoComponent } from './components/reconocimiento/reconocimiento.component';
import { InsertareditarreconocimientoComponent } from './components/reconocimiento/insertareditarreconocimiento/insertareditarreconocimiento.component';
import { GrabacionComponent } from './components/grabacion/grabacion.component';
import { InsertareditargrabacionComponent } from './components/grabacion/insertareditargrabacion/insertareditargrabacion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { InsertareditarnotificacionComponent } from './components/notificacion/insertareditarnotificacion/insertareditarnotificacion.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { TarifasComponent } from './components/tarifas/tarifas.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CantidadeventosxidinmuebleComponent } from './components/reportes/cantidadeventosxidinmueble/cantidadeventosxidinmueble.component';
import { ContargrabacionesxfechaComponent } from './components/reportes/contargrabacionesxfecha/contargrabacionesxfecha.component';
import { PromediotiempograbxidreconoComponent } from './components/reportes/promediotiempograbxidrecono/promediotiempograbxidrecono.component';
import { Listarmenor3dispositivosActComponent } from './components/reportes/listarmenor3dispositivos-act/listarmenor3dispositivos-act.component';
import { CantidadnotifixcategoriaComponent } from './components/reportes/cantidadnotifixcategoria/cantidadnotifixcategoria.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { CantreconoxdiaespecificoComponent } from './components/reportes/cantreconoxdiaespecifico/cantreconoxdiaespecifico.component';
import { ChatSecureIAComponent } from './components/chat-secure-ia/chat-secure-ia.component';
import { CantidadreconoxidinmuebleComponent } from './components/reportes/cantidadreconoxidinmueble/cantidadreconoxidinmueble.component';
import { CantidadusersxtiporolComponent } from './components/reportes/cantidadusersxtiporol/cantidadusersxtiporol.component';
import { CantidadusersxmesyanioComponent } from './components/reportes/cantidadusersxmesyanio/cantidadusersxmesyanio.component';
import { CantzonasmonitoactixidinmuebleComponent } from './components/reportes/cantzonasmonitoactixidinmueble/cantzonasmonitoactixidinmueble.component';
import { ZonasconmayorcantrecoComponent } from './components/reportes/zonasconmayorcantreco/zonasconmayorcantreco.component';
import { CantidadeventalertaltaxtipodispoComponent } from './components/reportes/cantidadeventalertaltaxtipodispo/cantidadeventalertaltaxtipodispo.component';
import { NoautorizadoComponent } from './pages/noautorizado/noautorizado.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'inicio',pathMatch:'full'
    },
    {path:'roles',component:RolComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarrolComponent,
                   
            },
            {
                path:'ediciones/:id', component:InsertareditarrolComponent
            }
        ],
            canActivate: [seguridadGuard],  //prueba en la ruta, se define en el menu
                data: { roles: ['ROLE_ADMIN'] }
    },
    {path:'usuarios',component:UsuarioComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarusuarioComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarusuarioComponent,
                
            }
        ],
            canActivate: [seguridadGuard],data: { roles: ['ROLE_ADMIN']}
    },

    {path:'inmuebles',component:InmuebleComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarinmuebleComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarinmuebleComponent
            }
        ],
        canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE']}
    },
    {path:'actividades',component:ActividadComponent,
          children:[
            {
            path: 'nuevo',
            component: InsertareditaractividadComponent
              ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_PADRE_FAMILIA'] }
            },
            {
                path:'ediciones/:id', component:InsertareditaractividadComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'perfilusuario',component:PerfilusuarioComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarperfilusuarioComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
            },
            {
                path:'ediciones/:id', component:InsertareditarperfilusuarioComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'geolocalizaciones',component:GeolocalizacionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditargeolocalizacionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditargeolocalizacionComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'zonasdetec',component:ZonadeteccionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarzonadeteccionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarzonadeteccionComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'dispositivos',component:DispositivoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditardispositivoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditardispositivoComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'eventos',component:EventodispositivoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditareventodispositivoComponent
                 ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_PADRE_FAMILIA'] }
            },
            {
                path:'ediciones/:id', component:InsertareditareventodispositivoComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'reconocimientos',component:ReconocimientoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarreconocimientoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarreconocimientoComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'grabaciones',component:GrabacionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditargrabacionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditargrabacionComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'notificaciones',component:NotificacionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarnotificacionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarnotificacionComponent
            }
        ],
        canActivate: [seguridadGuard]
    },
    {path:'inicio',component:LandingComponent}, //landing

    {path:'iniciarsesion',component:LoginComponent},  //login

    {path:'planes',component:TarifasComponent},//PLANES
    {
    path: 'ChatIA',
    component: ChatSecureIAComponent,  // CHATIA
    canActivate: [seguridadGuard],
    data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
    },

    {path:'reportes',component:ReportesComponent,
          children:[
            {
                path:'CantEventosxAlertaAlta',component:CantidadeventalertaltaxtipodispoComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_PADRE_FAMILIA'] }
            },
            {
                path:'CantEventosxIdInmuble',component:CantidadeventosxidinmuebleComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
            },
            {
                path:'ContarGrabacionesxFecha',component:ContargrabacionesxfechaComponent
            },
            {
                path:'PromedioGrabacionesxIdReco',component:PromediotiempograbxidreconoComponent
            },
            {
                path:'ListarMenor3dispositivosActivos',component:Listarmenor3dispositivosActComponent
                 ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
            },
            {
                path:'CantidadNotiSegunsuCategoría',component:CantidadnotifixcategoriaComponent
            },
            {
                path:'CantidadReconoxDíaSelecc',component:CantreconoxdiaespecificoComponent
                 ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
            },
            {
                path:'CantRecoxIdInmueble',component:CantidadreconoxidinmuebleComponent
                 ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN','ROLE_INDEPENDIENTE'] }
            },
            {
                path:'CantUsersxTypeRol',component:CantidadusersxtiporolComponent
                 ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN'] }
            },
            {
                path:'CantUsersxMesYAnio',component:CantidadusersxmesyanioComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN'] }
            },
            {
                path:'CantZonasMonitoActixInmueble',component:CantzonasmonitoactixidinmuebleComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN'] }
            },
            {
                path:'ZonasconMayorCantReco',component:ZonasconmayorcantrecoComponent
                ,canActivate: [seguridadGuard], data: { roles: ['ROLE_ADMIN'] }
            }
        ],
        canActivate: [seguridadGuard]
    },
   {
    path: 'noautorizado',
    component: NoautorizadoComponent
    }

];
