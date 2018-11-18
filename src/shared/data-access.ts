import { Question } from '../../src/shared/types';

export class DataAccess {

  public static getInstance() {
    if (!DataAccess.instance) {
      DataAccess.instance = new DataAccess();
      // initiate web request 
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
      // TODO implement by talking to algolia
    });
  }

  private static instance: DataAccess;
  private static questions: Question[];

  private constructor() {

  }
}