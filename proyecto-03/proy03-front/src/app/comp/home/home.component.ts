import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MovieService } from 'src/app/sv/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any = [];

  constructor(private movieService: MovieService, private route: Router) { }

  ngOnInit(): void {
    this.movieService
      .getAll()
      .subscribe(data => this.movies = data);
  }

  goToMovie(id: string) {
    this.route.navigate(['/movie', id]);
  }
}
