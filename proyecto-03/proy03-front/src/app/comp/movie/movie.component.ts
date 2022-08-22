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

  country_sales: any = {};

  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params
      .subscribe((params: Params) => this.id = params['id'])
    this.movieService.getOne(this.id)
      .subscribe(data => {
        this.movie = data

        this.movieService.getMoviesByID(this.movie.movie_id)
          .subscribe(mov => {
            // populate countries[]
            for (const m in mov) {
              this.country_sales[(mov as any)[m].country] = 0;
            }

            for (const m in mov) {
              this.country_sales[(mov as any)[m].country] += (mov as any)[m].sales;
            }
          });
      });
  }
}
