import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:3000/movies')
  }

  getOne(id: string) {
    return this.http.get(`http://localhost:3000/movies/${id}`)
  }

  getByYear(year: string) {
    return this.http.get(`http://localhost:3000/movies/by-year/${year}`)
  }

  getByActor(actor: string) {
    return this.http.get(`http://localhost:3000/movies/by-name/${actor}`)
  }

  getMoviesByID(id: number) {
    return this.http.get(`https://p03-db-default-rtdb.firebaseio.com/collection.json?orderBy=%22movie_id%22&equalTo=${id}`)
  }
}
