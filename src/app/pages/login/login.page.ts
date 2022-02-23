import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Usuario a validar: psonrie / s3cr3t
  form: FormGroup;

  appName = environment.app.name;
  appVersion = environment.app.version;
  appYear = environment.app.year

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navController: NavController) {
    this.buildForm();
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.buildForm();
  }

  /**
   * Creamos el formulario para el login con usuario y contraseña.
   */
  buildForm() {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin() {
    const formValues = this.form.value;
    this.authService.login(formValues.user, formValues.password)
      .then(async  response => {
        this.authService.setUserLogged(true);
        this.navController.navigateForward('psychologist-list');
      })
      .catch(async error => {
          const alert = await this.alertController.create({
            header: 'Login incorrecto',
            message: 'Credenciales erróneas, inténtelo de nuevo',
            buttons: ['OK']
          });
          await alert.present();
      });
  }
}
