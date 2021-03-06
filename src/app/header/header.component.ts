import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListnerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  OnLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }
}
