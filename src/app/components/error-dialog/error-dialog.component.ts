import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  message: string;
  message2: string;
  heading: string = "Error Occurred";
  gifURL: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
