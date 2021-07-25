import { CategoryEntity } from 'src/article/categories/entities/category.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'article_articles' })
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ default: new Date().toISOString() })
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column({ default: null })
  publishedAt: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.articles)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => ArticleEntity, (history) => history.parent)
  @JoinTable()
  histories: ArticleEntity[];

  @ManyToOne(() => ArticleEntity, (parent) => parent.histories)
  @JoinTable()
  parent: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinTable()
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinTable()
  publishedBy: UserEntity;
}
