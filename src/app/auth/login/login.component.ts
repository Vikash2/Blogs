import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
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
  onLogin(loginform: NgForm) {
    if (!loginform) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(loginform.value.email, loginform.value.password);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
