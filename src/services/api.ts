import Http from '../utils/http';
import { Article } from '../models/article';
import { Tag } from '../models/tag';
import { Category } from '../models/category';
import { Sign } from '../models/sign';
import { Mood } from '../models/mood';
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
type CategoryResponse = Category[];
type TagResponse = Tag[];
type SignResponse = Sign;
type MoodResponse = Mood;
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

  /**
   * @description 获取分类信息
   * @returns
   */
  async getCategories() {
    return http.get<CategoryResponse>(`${apiConfig.CATEGORIES}`);
  }

  /**
   * @description 获取标签信息
   * @returns
   */
  async getTags() {
    return http.get<TagResponse>(`${apiConfig.TAGS}`);
  }

  /**
   * @description 获取签名
   * @returns
   */
  async getSign() {
    return http.get<SignResponse>(`${apiConfig.SIGN}`);
  }

  /**
   * @description 获取心情
   * @returns
   */
  async getMood() {
    return http.get<MoodResponse>(`${apiConfig.MOOD}`);
  }
}
export default new API();
