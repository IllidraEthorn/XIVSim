import { IJourney } from './interfaces/journeys';
import { createMemoryHistory } from 'history'
export const FORM_NAME = 'editQuestion';
export const FORM_NEW_QUIZ = 'newQuiz';
export const FORM_EDIT_CATEGORY = 'editCategory';
export const DRAWER_WIDTH = 240;

export interface ICategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export const JOURNEY: IJourney = {

  rootJourney: [
    {
      path: process.env.PUBLIC_URL,
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', icon: 'home' },
        'divider',
        { path: '/DNCDemo', elementId: 'dncdemo', label: 'Dancer Demo' },
      ],
    },
  ],
};