import { Action } from "../actions"
import { IJourney } from '../../interfaces/journeys';

const setJourney = (journey: IJourney) => {
  return {
    type: Action.SET_JOURNEY,
    payload: journey
  }
};

export {setJourney}
