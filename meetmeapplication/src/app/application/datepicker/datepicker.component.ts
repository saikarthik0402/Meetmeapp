import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  selected!: Date | null;

  constructor() { }

  ngOnInit(): void {
  }

}
