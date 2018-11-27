import { Component,OnInit } from '@angular/core';
import {MessagingService} from './core/service/notification/push-notification.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  constructor(private msgService: MessagingService) {}
  title = 'fundoo';

  ngOnInit() {
    this.msgService.getPermission()
  }

}
