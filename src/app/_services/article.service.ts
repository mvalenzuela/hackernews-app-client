import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../_models/article';

@Injectable()
export class ArticleService {
  constructor(
    private http: HttpClient
  ) {}

  getArticles() {
    return this.http.get<Article[]>(`http://localhost:3000/articles`)
  }
}
