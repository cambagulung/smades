import { ArticleEntity } from 'src/article/articles/entities/article.entity';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Entity({ name: 'article_categories' })
export class CategoryEntity extends BaseEntity<CreateCategoryDto> {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', default: null })
  description: string;

  @ManyToMany(() => ArticleEntity, (article) => article.categories)
  articles: ArticleEntity[];
}
