// Actions
const LOAD = 'planner/slots/weekly/LOAD';
const RESET = 'planner/slots/weekly/RESET';

const initialState = {
  slots: [],
  isLoading: true,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, state, {
        slots: action.slotsWeekly,
        isLoading: false,
      });
    case RESET:
      return initialState;
    default: return state;
  }
}

// Action Creators
export const fetchSlotsWeeklySuccess = slotsWeekly => ({
  type: LOAD,
  slotsWeekly,
});

export const resetSlotsWeekly = () => ({
  type: RESET,
});

export const fetchSlotsWeekly = (mondayDate, authToken) => {
  const url = `${__API__}/availability/GetWeeklySlots/${mondayDate}`;
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('credentials', 'include');
  headers.append('ApiKey', authToken);

  return dispatch => (
    fetch(
      url,
      {
        method: 'GET',
        headers,
      },
    ).then(response => response.json())
      .then((res) => {
        dispatch(fetchSlotsWeeklySuccess(res));
      })
      .catch((error) => {
        throw (error);
      })
  );
};