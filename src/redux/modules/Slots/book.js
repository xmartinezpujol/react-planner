import * as weeklyActions from './weekly';

// Actions
const SET = 'planner/slots/book/SET';

const initialState = {
  bookedSlot: [],
  isLoading: true,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return initialState;
    default: return state;
  }
}

// Action Creators
// ...

export const bookSlot = (
  startDate,
  endDate,
  currWeek,
  patient,
  comments,
  authToken,
) => {
  const url = `${__API__}/availability/BookSlot/`;
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('credentials', 'include');
  headers.append('ApiKey', authToken);

  return dispatch => (
    fetch(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          Start: startDate,
          End: endDate,
          Patient: patient,
          Comments: comments,
        }),
      },
    ).then(() => {
      // Reload Weekly Planner View to track user changes & updates from others
      dispatch(weeklyActions.fetchSlotsWeekly(currWeek, authToken));
    })
      .catch((error) => {
        throw (error);
      })
  );
};
