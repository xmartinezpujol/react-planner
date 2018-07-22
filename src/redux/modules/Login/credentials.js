const CHECK = 'planner/login/credentials/CHECK';
const CREATE = 'planner/login/credentials/CREATE';

const initialState = [
  {
    email: 'xmartinez@gmail.com',
    password: 'skyhigh87',
  },
];

// Action Creators
export const fetchCredentials = () => ({
  type: CHECK,
});

export const createCredentials = (email, password) => ({
  type: CREATE,
  email,
  password,
});

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK:
      return state;
    case CREATE:
      return [...state, {
        email: action.email,
        password: action.password,
      }];
    default:
      return state;
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
