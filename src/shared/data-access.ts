import { Question } from '../../src/shared/types';
import algoliasearch from 'algoliasearch';

export class DataAccess {


  public static getInstance() {
    if (!DataAccess.instance) {
      DataAccess.instance = new DataAccess();
      // initiate web request 
      //index.addObjects(DataAccess.questions, function(err, content) {
      //  console.log(content);
      //});
    }
    return DataAccess.instance;
  }

  public static QuestionsNotLoadedError: Error = new Error('Questions not loaded!');

  public static getPopularQuestions = (count: number): Promise<Question[]> => {
    return new Promise( (resolve, reject) => {
      if (DataAccess.questions === undefined) {
        reject(DataAccess.QuestionsNotLoadedError)
      }
      // FIXME this implementation only returns the first x questions
      resolve(DataAccess.questions.slice(0, count));
    });
  }

  public static getQuestionsInCategory = (category: string): Promise<Question[]> => {
    return new Promise( (resolve, reject) => {
      if (DataAccess.questions === undefined) {
        reject(DataAccess.QuestionsNotLoadedError)
      }
      // returns empty array if no categories found
      const isInCategory = (q: Question) => q.categories.indexOf(category) !== -1;
      resolve(DataAccess.questions.filter(isInCategory));
    });
  }

  public static getQuestionsBySearchString = (searchString: string): Promise<Question[]> => {
    return new Promise( (resolve, reject) => {
      if (DataAccess.questions === undefined) {
        reject(DataAccess.QuestionsNotLoadedError)
      }
      DataAccess.index.search({query: searchString}, (err: any, content: any): any => {
        if (err) reject(err);
        resolve(content.hits);
      });
    });
  }

  private static instance: DataAccess;
  private static questions: Question[];
  private static index: any;

  private constructor() {
    const API_KEY = '';
    const APP_ID = '';
    const INDEX_NAME='';
    var client = algoliasearch(APP_ID, API_KEY);
    DataAccess.index = client.initIndex(INDEX_NAME);
  }
}