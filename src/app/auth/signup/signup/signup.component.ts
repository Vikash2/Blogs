import { AuthService } from "./../../auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }
  onSignUp(signupform: NgForm) {
    if (signupform.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.createUser(
        signupform.value.email,
        signupform.value.password
      );
    }
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
