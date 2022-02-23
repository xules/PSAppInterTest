import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Psychologist } from 'src/app/interfaces/psychologist/psychologist';
import { PsychologistService } from 'src/app/services/psychologist/psychologist.service';

@Component({
  selector: 'app-psychologist-list',
  templateUrl: './psychologist-list.page.html',
  styleUrls: ['./psychologist-list.page.scss'],
})
export class PsychologistListPage implements OnInit {

  psychologists: Psychologist[];

  constructor(
    private psychologistService: PsychologistService,
    private alertController: AlertController,
    private navController: NavController
  ) {

  }

  ngOnInit() {
    this.loadPsychologists();
  }

  loadPsychologists(){
    this.psychologistService.getAll()
      .then( async data => {
        let psycos = await data;
        console.log('Listado de Psicologos');
        console.log(data.status);
        if (data.status == 200) {
          console.log(data.data);
          console.log(data.headers);
          let psychos: Psychologist[] = JSON.parse(data.data);
          this.psychologists = JSON.parse(data.data);
          psychos.forEach(ps => {
            console.log('Datos: ' + ps.id + ' -> ' + ps.name);
          });
        }else {
          const alert = await this.alertController.create({
            header: 'Ha habido un problema al cargar los psicólogos',
            message: 'Se le redigirá al login para recuperar la conexión, si persiste el error contacte con el servicio técnico.',
            buttons: [ {
                text: 'OK',
                id: 'confirm-button',
                handler: () => {
                  console.log('Confirm Okay');
                  this.navController.navigateForward('login')
                }
              }
            ]
          });
          await alert.present();
        }

      })
      .catch(async error => {
        const alert = await this.alertController.create({
          header: 'Ha habido un problema al cargar los psicólogos',
          message: 'Se le redigirá al login para recuperar la conexión, si persiste el error contacte con el servicio técnico.',
          buttons: [ {
              text: 'OK',
              id: 'confirm-button',
              handler: () => {
                console.log('Confirm Okay');
                this.navController.navigateForward('login')
              }
            }
          ]
        });
        await alert.present();
      }
      );


    this.psychologistService.getById('bb7a9087-e698-4eeb-b2ec-d5f2355d7d6b')
      .then( async data  => {
        let psycos = await data;
        console.log('Psicologo bb7a9087-e698-4eeb-b2ec-d5f2355d7d6b');
        console.log(data);

      })
      .catch(error => {
        console.log('Psycho bb7a9087-e698-4eeb-b2ec-d5f2355d7d6b error');
        console.log(error);
        }
      );
  }

  /**
   * Navegamos para ver los detalles del pedido en el hacemos navegación por el id del pedido.
   * @param orderId pasamos como parámetro el id del pedido que vamos a cambiar.
   */
  goToPsychologistDetail(id: string) {
    // console.log('[order.page] Navegamos al pedido ' + orderId);
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.navController.navigateForward(['psychologist'], navigationExtras);
  }
}
