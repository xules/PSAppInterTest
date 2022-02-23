import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Psicólogos', url: '/psychologist-list', icon: 'person' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private authService: AuthService,
    private navController: NavController,
    private menuController: MenuController,
  ) {

  }
  ngOnInit(){
    this.listenAuthState();
  }

  /**
   * Control de usuario registrado.
   */
  listenAuthState() {
    this.authService.authenticationState.subscribe(async (state) => {
      if (await state) {
        this.menuController.enable(true);
      } else {
        this.menuController.enable(false);
        this.navController.navigateForward('login');
      }
    });
  }

  doLogout() {
    this.authService.setUserLogged(false);
  }
}
