import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-thumbnail.component.html',
  styleUrl: './article-thumbnail.component.scss',
})
export class ArticleThumbnailComponent {
  @Input() article!: Article;
  @Output() notifyLike = new EventEmitter<Article>();

  sendNotification() {
    this.notifyLike.emit(this.article);
  }
}
