import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../_models/article';

@Injectable()
export class ArticleService {
  constructor(
    private http: HttpClient
  ) {}

  public getArticles() {
    return this.http.get<Article[]>(`http://localhost:3000/articles`);
  }
  public deleteOne(articleId: string){
    const options = articleId ?
    { params: new HttpParams().set('article_id', articleId) } : {};
    return this.http.delete(`http://localhost:3000/article`, options)
  }
}
