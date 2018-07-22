const LOG = 'planner/global/status/LOG';
const SET_LOGIN_STATUS = 'planner/global/status/SET_LOGIN_STATUS';

const initialState = {
  isLogged: false,
  plannerMode: 'week',
};

// Action Creators
export const getStatus = () => ({
  type: LOG,
});

export const setLoginStatus = loginStatus => ({
  type: SET_LOGIN_STATUS,
  loginStatus,
});

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOG:
      return state;
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogged: action.loginStatus,
      };
    default:
      return state;
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
