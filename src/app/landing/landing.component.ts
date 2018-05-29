import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { User } from '../../server/interfaces/user';
import { UserService } from '../core/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kon-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
        this.changeDetector.markForCheck();
      });
  }
}
