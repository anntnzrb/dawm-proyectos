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
  movies_filter_year: any = [];
  movies_filter_actor: any = [];
  actors: any = [];

  // filters
  years: any = [];

  constructor(private movieService: MovieService, private actorService: ActorsService, private route: Router) { }

  ngOnInit(): void {
    this.actorService
      .getAll()
      .subscribe(data => this.actors = data);

    this.movieService
      .getAll()
      .subscribe(data => {
        this.movies = data

        // populate years[]
        const set = new Set();
        for (const m of this.movies) {
          set.add(m.year);
        }

        this.years = Array.from(set);
        this.years.sort();
      });
  }

  goToMovie(id: string) {
    this.route.navigate(['/movie', id]);
  }

  getMoviesByYear(year: string) {
    this.movieService
      .getByYear(year)
      .subscribe(data => {
        this.movies_filter_year = data
      });
  }

  getMoviesByActor(actor: string) {
    this.movieService
      .getByActor(actor)
      .subscribe(data => this.movies_filter_actor = data);
  }
}
