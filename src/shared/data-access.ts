import { Question } from '../../src/shared/types';
<<<<<<< HEAD
import algoliasearch from 'algoliasearch';
=======
import { parse } from 'papaparse';
>>>>>>> 374b7f9a96a514df587065129800aa522b32a55f

const GOOGLE_SHEETS_QUESTIONS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ3Ag8K_d4V3rzBf9pXQ5J9GInmj9VCeNknjuV_S9sO-yqZOzCg1gbQt3UHdthqXOL24v0Fw4fPrFy/pub?output=csv';
interface RawGoogleSheetsQuestion {
  id: string
  topic: string
  question: string
  tags: string
  answer: string
}
const toQuestion = (q: RawGoogleSheetsQuestion): Question => {
  return {
    id: q.id,
    question: q.question,
    answer: q.answer,
    tags: q.tags.split(',').map( tag => tag.trim() ),
    categories: q.topic.split(',').map( category => category.trim() )
  }
}

/**
 * DataAccess is a singleton class that contains methods for accessing 
 * the app's question data.
 */
export class DataAccess {


  public static getInstance() {
    if (!DataAccess.instance) {
      // create the singleton instance
      DataAccess.instance = new DataAccess();
<<<<<<< HEAD
      // initiate web request 
      //index.addObjects(DataAccess.questions, function(err, content) {
      //  console.log(content);
      //});
=======

      // TODO handle network errors here, use repeated download attempts + falloff
      // initiate loading google sheets data as csv
      parse(GOOGLE_SHEETS_QUESTIONS_URL, {
        download: true,
        header: true,
        complete: (res: any) => {
          const rawQuestions: RawGoogleSheetsQuestion[] = res.data;
          const questions: Question[] = rawQuestions.map( toQuestion );
          DataAccess.questions = questions;
        }
      });

>>>>>>> 374b7f9a96a514df587065129800aa522b32a55f
    }
    return DataAccess.instance;
  }

  public static QuestionsNotLoadedError: Error = new Error('Questions not loaded!');

  public static getPopularQuestions = (count: number): Promise<Question[]> => {
    return new Promise( (resolve, reject) => {
      if (DataAccess.questions === undefined) {
        reject(DataAccess.QuestionsNotLoadedError)
      }
      // FIXME this is a mock implementation that returns a random set of questions
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