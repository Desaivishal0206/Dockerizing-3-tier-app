import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  isSpinning = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router) {}

  validateForm!: FormGroup;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [ Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  

  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if(this.validateForm.valid){
      console.log("In function");
      this.isSpinning = true;
      let data ={
        oldPassword: this.validateForm.get(['oldPassword'])!.value,
        newPassword: this.validateForm.get(['password'])!.value,
      }
      this.authService.changePassword(data).subscribe((res)=>{
        this.isSpinning = false;
        if(res.status == "CREATED"){
          this.notification
          .success(
            'SUCCESS',
            `${res.message}`,
            { nzDuration: 5000 }
          );
        }else{
          this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
        }
      },error=>{
        console.log("errorr",error);
        if(error.status == 406){
          this.notification
          .error(
            'ERROR',
            `${error.error}`,
            { nzDuration: 5000 }
          )
        }
        this.isSpinning = false;
      
      });
    }else{
      for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
    }
  }

}