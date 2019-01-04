import API from './api';
import { Article } from '../models/article';

class ArticleManager {
  private transformArticles = (articles: Article[]) => {
    return articles.map((article) => {
      const urlArr = article.url.split('/');
      const date = new Date(article.birthTime);
      const tags = article.tags.map(tag => tag.name);
      const { _id: id } = article;
      return {
        id,
        tags,
        title: article.title,
        fileName: urlArr[urlArr.length - 1],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      };
    });
  }
  private transformArticlesWithTimeGap(articles: Article[]) {
    const result: any[] = [];
    let year = '';
    articles.forEach((article) => {
      const urlArr = article.url.split('/');
      const date = new Date(article.birthTime);
      const { _id: id } = article;
      if (date.getFullYear().toString() !== year) {
        year = date.getFullYear().toString();
        result.push({
          id: id + year,
          type: 'large',
          name: year,
        });
      }
      const obj = {
        id,
        type: 'small',
        name: article.title,
        fileName: urlArr[urlArr.length - 1],
        date: `${date.getMonth() + 1}-${date.getDate()}`,
        url: `/blog/${year}/${date.getMonth() + 1}/${date.getDate()}/${urlArr[urlArr.length - 1]}`,
      };
      result.push(obj);
    });
    return result;
  }
  async getArticles(page: number, pageSize: number) {
    const { data: { articles, allCount } } = await API.getArticles(page, pageSize)
      .catch((err) => { throw err; });
    const articleList = this.transformArticles(articles);
    return {
      articleList,
      allCount,
    };
  }
  async getArticlesBy(
    { page, pageSize, category, tag }:
    { page: number; pageSize: number; category?: string; tag?: string },
  ) {
    const {
      data: { articles, allCount },
    } = await API.getArticlesBy({ page, pageSize, category, tag })
      .catch((err) => { throw err; });
    const articleList = this.transformArticlesWithTimeGap(articles);
    return {
      articleList,
      allCount,
    };
  }
  async openArticle(id: string) {
    const { data } = await API.openArticle(id)
      .catch((err) => { throw err; });
    return data;
  }
}
export default new ArticleManager();
