import { Component, OnInit } from '@angular/core';
import { ArticleService} from './_services/article.service';
import { Article } from './_models/article';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  todayDate: Date;
  articles: Article[];
  title = 'hacker-news';
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
  displayedColumns: string[] = ['title', 'date', 'delete'];

  constructor(private articleService: ArticleService) {}

  loadArticles(){
    this.articleService.getArticles().subscribe((data: Article[]) => {
      this.articles = this.formatArticles(data);
    });
  }

  ngOnInit() {
    this.loadArticles();
  }

  formatArticles(articles){
    const formattedArticles = [];
    articles.map((article) => {
      if (this.hasTitle(article)){
        let newArticle = {
          id: article.id,
          title: this.formatTitle(article),
          author: article.author,
          date: this.formatDate(article.date),
          url: this.formatUrl(article)
        }
        formattedArticles.push(newArticle);
      }
    });
    return formattedArticles;
  }

  formatUrl(article){
    if (article.storyUrl == null){
      return article.url
    }
    return article.storyUrl
  }

  hasTitle(article){
    if (article.storyTitle == null && article.title == null){
      return false;
    }
    return true;
  }

  formatTitle(article){
    if (article.storyTitle == null){
      return article.title;
      }
    else {
      return article.storyTitle;
    }
  }

  formatDate(rawDate){
    let formattedDate;
    let todayDate = new Date();
    let date = new Date(rawDate);
    let differenceBetweenDates = Math.abs(todayDate.getDate() - date.getDate());
    let differenceBetweenMoths = todayDate.getMonth() - date.getMonth();
    if ( differenceBetweenDates == 1){
      formattedDate = "Yesterday";
    }
    else if (differenceBetweenDates == 0 && differenceBetweenMoths == 0){
      if (date.getHours() / 12 < 1){
        formattedDate = String(date.getHours()) + ":" + String(date.getMinutes()) + " am"
      }
      else {
        formattedDate = String(date.getHours() % 12) + ":" + String(date.getMinutes()) + " pm"
      }
    }
    else {
      formattedDate = this.months[date.getMonth()] + " " + String(date.getDate());
    }
    return formattedDate;
  }
  openUrl(element){
    window.open(element.url, '_blank');
  }
}
