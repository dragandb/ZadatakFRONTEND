import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { matchValidator } from '../shared/form-validator';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { UserRegister } from '../_interfaces/userRegister.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  registerForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private service: AuthService, private errorHandler: ErrorHandlerService,
    private router: Router, private modal: BsModalService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), matchValidator('confirmPassword', true)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), matchValidator('password')])
    });
  }

  validateControl = (controlName: string) => {
    if (this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.registerForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  registerUser = (registerFormValue) => {
    if (this.registerForm.valid)
      this.executeRegisterKupac(registerFormValue);
  }

  private executeRegisterKupac = (registerFormValue) => {
    const user: UserRegister = {
      email: registerFormValue.email,
      password: registerFormValue.password,
      confirmPassword: registerFormValue.confirmPassword
    }
    const apiUrl = 'api/Auth/Register';
    this.service.createUser(apiUrl, user)
    .subscribe({
      next: (reg: UserRegister) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `User created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToHome());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToHome = () => {
    this.router.navigate(['/home']);
  }
}