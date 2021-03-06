import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

// Import ReactiveJS toPromise
import 'rxjs/add/operator/toPromise';

import { Announcement } from '../../bulletin-board/announcement';
import { User } from '../../projects/project-details/project-user/User';
import { environment } from '../../../environments/environment';

@Injectable()
export class BulletinBoardService {
  private headers = new Headers({'Content-type': 'application/JSON'});
  private baseUrl: string = environment.serverUrl;

  public announcements: Announcement[] = [];

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  // Fetch Information
  getAnnouncements(teamId: number): void {
    this.http.get(`${this.baseUrl}/api/announcements/${teamId}`)
      .toPromise()
      .then( (response) => {
        console.log(response.json(), 'response.json');
        this.announcements = response.json().announcements;
      })
      .catch(this.handleError);
  }

  // Post Information
  createAnnouncement(teamId: number, userId: number, announcement: string): void {
    console.log(announcement, 'inside post');
    this.http.post(
      `${this.baseUrl}/api/announcements`,
      JSON.stringify({announcement: announcement, user_id: userId, team_id: teamId}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        console.log(response, 'should be response from server');
        this.announcements.push(response.json());
        console.log(this.announcements, 'announcement array');
      })
      .catch(this.handleError);
  }

  // Edit Information
  editAnnouncement(announcementId: number, announcement: string): void {
    this.http.put(
      `${this.baseUrl}/api/announcements/${announcementId}`,
      JSON.stringify({announcementId: announcementId, announcementChanges: {announcement: announcement}}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        console.log(response, 'after put request');
        this.announcements.find(announcement => announcementId === announcementId)
      })
      .catch(this.handleError);
  }

  // Delete Information
  deleteAnnouncement(announcementId: number): void {
    this.http.delete(`${this.baseUrl}/api/announcements/${announcementId}`)
      .toPromise()
      .then( (response) => {
        let announcementToRemove = this.announcements.findIndex(announcement => announcement.id === announcementId);
        this.announcements.splice(announcementToRemove, 1);
      })
      .catch(this.handleError);
  }
}