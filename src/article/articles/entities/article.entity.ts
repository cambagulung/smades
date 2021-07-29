import { CategoryEntity } from 'src/article/categories/entities/category.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  publishedAt: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.articles)
  @JoinTable()
  categories: CategoryEntity[];

  @TreeChildren()
  histories: ArticleEntity[];

  @TreeParent()
  parent: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  publishedBy: UserEntity;
}
