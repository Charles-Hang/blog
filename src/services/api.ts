import Http from '../utils/http';
import { Article } from '../models/article';
import { Tag } from '../models/tag';
import { Category } from '../models/category';
import apiConfig from './config';

const http = new Http({
  baseURL: apiConfig.baseURL,
});

interface ArticlesResponse {
  articles: Article[];
  allCount: number;
}
interface ArticleDetailResponse {
  html: string; // 不定
  toc: string; // 不定
  info: {
    title: string;
    date: string;
    tags: Tag[];
    categories: Category[];
  };
}
class API {
  /**
   * @description 获取文章列表
   * @param {number} page
   * @param {number} pageSize
   * @returns
   */
  async getArticles(page: number, pageSize: number) {
    return http.get<ArticlesResponse>(`${apiConfig.ARTICLES}`, {
      params: {
        page,
        limit: pageSize,
      },
    });
  }

  /**
   * @description 按分类或标签获取文章列表 tag和category传且只能传一个
   * @param {number} page
   * @param {number} pageSize
   * @param {string} [category]
   * @param {string} [tag]
   * @returns
   */
  async getArticlesBy({
    page,
    pageSize,
    category,
    tag,
  }: {
    page: number;
    pageSize: number;
    category?: string;
    tag?: string;
  }) {
    const url = category ? apiConfig.ARTICLES_BY_CATEGORY : apiConfig.ARTICLES_BY_TAG;
    return http.get<ArticlesResponse>(`${url}`, {
      params: {
        page,
        category,
        tag,
        limit: pageSize,
      },
    });
  }

  /**
   * @description 获取文章内容
   * @param {string} id
   */
  async openArticle(id: string) {
    return http.get<ArticleDetailResponse>(`${apiConfig.ARTICLE}`, {
      params: {
        id,
      },
    });
  }
}
export default new API();
