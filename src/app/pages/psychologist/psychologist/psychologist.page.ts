import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Psychologist } from 'src/app/interfaces/psychologist/psychologist';
import { PsychologistService } from 'src/app/services/psychologist/psychologist.service';

@Component({
  selector: 'app-psychologist',
  templateUrl: './psychologist.page.html',
  styleUrls: ['./psychologist.page.scss'],
})
export class PsychologistPage implements OnInit {

  idPsychologist: string;
  psychologist: Psychologist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private psychologistService: PsychologistService,
    private navController: NavController
  ) {

    this.activatedRoute.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idPsychologist = this.router.getCurrentNavigation().extras.state.id;
        console.log('[PsychologistPage] Entramos en PsychologistPage......' + this.idPsychologist);
        this.loadPsychologist(this.idPsychologist);
      }
    });
  }

  ngOnInit() {
  }


  loadPsychologist(id: string){
    this.psychologistService.getById(id)
      .then( async data  => {
        let status = await data.status;
        if (data.status == 200) {
          this. psychologist = JSON.parse(data.data);
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
      })
  }
}
