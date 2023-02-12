import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/services/helper/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText:boolean = false;
  signupForm!: FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    //form controller
    this.signupForm = this.FormBuilder.group({
      Username: ['', Validators.required],
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  Onsignup(){
    if (this.signupForm.valid){
      console.log(this.signupForm.value)
      this.auth.signUp(this.signupForm.value)
            .subscribe({
              next:(res)=>{
                alert(res.message);
                this.signupForm.reset();
              }});
              
            
    }else {
      ValidateForm.validateAllFormfileds(this.signupForm)
      alert("Your form is Invalid")
    }
  }
  signUp() {
    //post call to store objects
    this.http
      .post<any>('https://localhost:44321/api/User/register',this.signupForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          alert('Signup Successfull');
          this.signupForm.reset();
          this.router.navigate(['login']);
        }
      );
  }
}