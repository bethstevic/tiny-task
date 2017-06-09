import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user-service/user.service';
import { ProjectsService } from '../services/projects-service/projects.service';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {
  constructor(
    private userService: UserService,
    private projectsService: ProjectsService
   ) { }

  ngOnInit() {
    // Stub 'Brian' for user profile
    console.log('Initiated');
    this.userService.getUserInfo('Brian');
  }
}
