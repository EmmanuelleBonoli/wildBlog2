import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { AsyncPipe } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [AsyncPipe, ArticleThumbnailComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<Article[]>;
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.articles$ = this.apiService.getArticles();
  }

  handleLike(article: Article) {
    article.isLiked = !article.isLiked;
  }
}
