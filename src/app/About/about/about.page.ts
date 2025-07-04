import { Component } from '@angular/core';
import {CalendarEvent} from "calendar-link";
import { ToastController } from '@ionic/angular';
import { EventColor } from "calendar-utils";
import * as moment from 'moment';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false
})

export class AboutPage {


  constructor(private toastController: ToastController) {
  }

  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: moment().startOf('day').subtract(1, 'days').toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'A 3 day event',
      allDay: true,
    },
    {
      start: moment().startOf('day').toDate(),
      title: 'An event with no end date',
    },
    {
      start: moment().endOf('month').subtract(3, 'days').toDate(),
      end: moment().endOf('month').add(3, 'days').toDate(),
      title: 'A long event that spans 2 months',
      allDay: true,
    },
    {
      start: moment().startOf('day').add(2, 'hours').toDate(),
      end: moment().add(2, 'hours').toDate(),
      title: 'A draggable and resizable event',
    },
  ];

  handleEventClicked({event}: { event: CalendarEvent }): void {
    console.log('Sự kiện được click:', event);

    // Ví dụ mở popup, dialog, hoặc chuyển hướng
    alert(`Bạn vừa click vào sự kiện: ${event.title}`);
  }

  peopleCount: number = 2;

  increasePeople() {
    this.peopleCount++;
  }

  decreasePeople() {
    if (this.peopleCount > 1) {
      this.peopleCount--;
    }
  }

  async confirmBooking() {
    const toast = await this.toastController.create({
      message: 'Đặt bàn thành công!',
      duration: 2000,
      cssClass: 'text-white',
      color: 'success',    // Màu xanh báo thành công
      position: 'bottom',  // Vị trí toast hiện ở dưới màn hình
      icon: 'checkmark-circle-outline', // icon đẹp
    });
    toast.present();
  }
}
