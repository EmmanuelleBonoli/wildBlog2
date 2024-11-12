import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { DatePipe, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  articleId!: number;
  article$!: Observable<Article | undefined>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      this.getArticleById(this.articleId);
    });
  }

  getArticleById(id: number) {
    this.article$ = this.http
      .get<Article[]>(' http://localhost:3000/articles')
      .pipe(
        tap((article) => console.log(article)),
        map((articles) =>
          articles.find((article) => Number(article.id) === id)
        ),
        tap((article) => console.log(article))
      );
  }
}
