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
        if (data.status == 200) {
          this.psychologists = JSON.parse(data.data);
        }else {
          const alert = await this.alertController.create({
            header: 'Ha habido un problema al cargar los psicólogos',
            message: 'Se le redigirá al login para recuperar la conexión, si persiste el error contacte con el servicio técnico.',
            buttons: [ {
                text: 'OK',
                id: 'confirm-button',
                handler: () => {
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
                this.navController.navigateForward('login')
              }
            }
          ]
        });
        await alert.present();
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
