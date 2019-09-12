import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
