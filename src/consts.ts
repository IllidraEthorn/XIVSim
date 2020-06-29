import { IJourney } from './interfaces/journeys';

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
      path: '',
      elementId: 'main',
      children: [
        { path: '/XIVSim', elementId: 'welcome', label: 'Home', icon: 'home' },
        'divider',
        { path: '/XIVSim/counter', elementId: 'counter', label: 'Counter' },
      ],
    },
  ],
};