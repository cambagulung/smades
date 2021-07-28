import { ArticleEntity } from 'src/article/articles/entities/article.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'article_categories' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column({ default: new Date().toISOString() })
  createdAt: Date;

  @ManyToMany(() => ArticleEntity, (article) => article.categories)
  articles: ArticleEntity[];
}
