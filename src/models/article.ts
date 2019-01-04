import { Tag } from './tag';
import { Category } from './category';

export interface Article {
  _id: string;
  title: String;
  publish: Boolean;
  birthTime: string;
  tags: Tag[];
  categories: Category[];
  url: String;
}
