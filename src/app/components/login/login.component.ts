import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/services/helper/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('https://localhost:44321/api/User/authenticate')
    .subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.username == this.loginForm.value.username &&
            a.password === this.loginForm.value.password
          );
        });
        Onlogin()
        {
          if (this.loginForm.valid){
            console.log(this.loginForm.value)
            this.auth.login(this.loginForm.value)
            .subscribe({
              next:(res)=>{
                alert(res.message)
              }
            });
          }else {
            ValidateForm.validateAllFormfileds(this.loginForm)
            alert("Your form is Invalid");
          }
      
        }


        if (user) {
          alert('Login Success!!');
          this.router.navigate(['component/home']);
          //this.router.navigate(['component/product']);
          //this.router.navigate(['component/cart']);
          this.loginForm.reset();
        } else {
          alert('User not found!!');
        }
      },
      (err) => {
        alert('Something went wrong!!');
      }
    );
  }
}

function Onlogin() {
  throw new Error('Function not implemented.');
}
