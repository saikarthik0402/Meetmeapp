import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent implements OnInit {

  @Input() field:any;
  @Input() checkbox : any;


  ngOnInit(): void 
  {
  
  }

}

