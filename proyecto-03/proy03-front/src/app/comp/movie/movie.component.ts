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
  movies_year: any = [];
  movies_sales: any = [];
  id: string = "";

  sales = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  constructor(private movieService: MovieService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params
      .subscribe((params: Params) => this.id = params['id'])
    this.movieService.getOne(this.id)
      .subscribe(data => {
        this.movie = data

        this.movieService.getMoviesByYear(this.movie.year)
          .subscribe(mov => {
            for (const m in mov) {
              this.movies_year.push((mov as any)[m]);
              this.movies_sales.push((mov as any)[m].sales);
            }

            for (const s of this.movies_sales) {
              this.sales.january += s.january,
                this.sales.february += s.february,
                this.sales.march += s.march,
                this.sales.april += s.april,
                this.sales.may += s.may,
                this.sales.june += s.june,
                this.sales.july += s.july,
                this.sales.august += s.august,
                this.sales.september += s.september,
                this.sales.october += s.october,
                this.sales.november += s.november,
                this.sales.december += s.december
            }
          });
      });

    console.log(this.movies_sales);
    console.log(this.sales);

  }
}
