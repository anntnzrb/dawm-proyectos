import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/sv/movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any;
  id: string = "";
  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => this.id = params['id'])
    this.movieService.getOne(this.id).subscribe(data => this.movie = data);
  }
}
