import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage  {
    form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(  private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController) { }

    async login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email!, password!);
      this.router.navigateByUrl('/dashboard/dashboard-page');
    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

 
  

}
