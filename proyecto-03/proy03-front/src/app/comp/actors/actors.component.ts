import { Component, OnInit } from '@angular/core';
import { ActorsService } from 'src/app/sv/actors.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors: any = [];

  constructor(private actorService: ActorsService) { }

  ngOnInit(): void {
    this.actorService
      .getAll()
      .subscribe(data => this.actors = data);
  }
}
