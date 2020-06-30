import { IJourney } from './interfaces/journeys';
import { jobMods } from './sim/jobs/jobmods';
import { Player } from './sim/player/player';
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
        { path: '/', elementId: 'welcome', label: 'Home', icon: 'home' },
        'divider',
        { path: '/DNCDemo', elementId: 'dncdemo', label: 'Dancer Demo' },
      ],
    },
  ],
};

export const dancerBIS: Player = {
  stats: {
    mainStat: 4871,
    weaponDamage: 128,
    crit: 3969,
    det: 2067,
    dhit: 2762,
    spellSpeed: 380,
    skillSpeed: 380,
    tenacity: 380
  },
  jobMod: jobMods.dancer
}