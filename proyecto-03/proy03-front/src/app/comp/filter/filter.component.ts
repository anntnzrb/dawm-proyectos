import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorsService } from 'src/app/sv/actors.service';
import { MovieService } from 'src/app/sv/movie.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  movies: any = [];
  actors: any = [];

  constructor(private movieService: MovieService, private actorService: ActorsService, private route: Router) { }

  ngOnInit(): void {
    this.actorService
      .getAll()
      .subscribe(data => this.actors = data);
  }

  goToMovie(id: string) {
    this.route.navigate(['/movie', id]);
  }

  getMoviesByYear(year: string) {
    this.movieService
      .getByYear(year)
      .subscribe(data => this.movies = data);
  }

  getMoviesByActor(actor: string) {
    this.movieService
      .getByActor(actor)
      .subscribe(data => this.movies = data);
  }
}
