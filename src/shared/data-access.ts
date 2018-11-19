import algoliasearch from 'algoliasearch';
import { parse } from 'papaparse';

import { Question } from '../shared/types';
import { QuestionCategory } from '../shared/enums'

/**
 * DataAccess is a singleton class that contains methods for accessing 
 * the app's question data.
 * 
 * TODO implementation of loading questions is convoluted and throws network
 * errors to user.
 */
export class DataAccess {

  public static QuestionsNotLoadedError: Error = new Error('Questions not loaded!');

  public static getPopularQuestions = (count: number): Promise<Question[]> => {
    // FIXME this is a mock implementation that returns a random set of questions
    return new Promise( (resolve, reject) => {
      DataAccess.awaitQuestionsLoaded().then( questions => {
        resolve(questions.slice(0, count));
      })
    });
  }

  public static getQuestionsInCategory = (category: QuestionCategory): Promise<Question[]> => {
    const isInCategory = (q: Question) => q.categories.indexOf(category) !== -1;
    return new Promise( (resolve, reject) => {
      DataAccess.awaitQuestionsLoaded().then( questions => {
        const questionsInCategory = questions.filter(isInCategory);
        resolve(questionsInCategory);
      });
    });
  }

  public static getQuestionsBySearchString = (searchString: string): Promise<Question[]> => {
    return new Promise( (resolve, reject) => {
      DataAccess.questionsIndex.search({query: searchString}, (err: any, content: any): any => {
        if (err) {
          reject(err);
        } else {
          resolve(content.hits);
        }
      });
    });
  }

  private static allQuestions: Question[];
  private static questionsRequestInFlight: boolean;
  private static questionsRequest: Promise<Question[]>;
  private static questionsIndex: any;

  private constructor() {
    const API_KEY = '';
    const APP_ID = '';
    const INDEX_NAME= '';
    var client = algoliasearch(APP_ID, API_KEY);
    DataAccess.questionsIndex = client.initIndex(INDEX_NAME);
  }

  /**
   * loadAllQuestions makes a network request for all questions from the backend.
   */
  private static loadAllQuestions = (): Promise<Question[]> => {
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
    // parse (from papaparse) loads and parses a csv stream directly from a url.
    return new Promise( (resolve, reject) => {
      parse(GOOGLE_SHEETS_QUESTIONS_URL, {
        download: true,
        header: true,
        error: (err: any) => {
          reject(err);
        },
        complete: (res: any) => {
          const rawQuestions: RawGoogleSheetsQuestion[] = res.data;
          const questions: Question[] = rawQuestions.map( toQuestion );
          resolve(questions)
        }
      });
    });
  }

  private static awaitQuestionsLoaded = (): Promise<Question[]> => {
    // if we already loaded the questions, return those
    if (DataAccess.allQuestions !== undefined) {
      return Promise.resolve(DataAccess.allQuestions);
    // if a different network request is already in flight, return the in-flight request
    // instead of starting a new one.
    } else if (DataAccess.questionsRequestInFlight === true) {
      return DataAccess.questionsRequest;
    // otherwise, initiate a network request for the questions.
    } else {
      DataAccess.questionsRequestInFlight = true;
      DataAccess.questionsRequest = DataAccess.loadAllQuestions().then( allQuestions => {
        DataAccess.questionsRequestInFlight = false;
        DataAccess.allQuestions = allQuestions;
        return DataAccess.allQuestions;
      });
      return DataAccess.questionsRequest;
    }
  }
}