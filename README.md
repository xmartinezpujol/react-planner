# React Planner

![React Planner](/planner.PNG?raw=true "React Planner")

### Client localhost
Node/NPM required to install dependencies.

Clone rep
``` shell
git clone https://github.com/xmartinezpujol/react-planner.git
```

Install dependencies
``` shell
npm install
```

Start development
``` shell
npm start
```

Run Storybook (UI Explorer) at http://localhost:6006
``` shell
npm run storybook
```

Build Storybook Static
``` shell
npm run build-storybook
```

Make Production Bundle
``` shell
npm run build
```

### Testing

* Unit / Integration tests are run with Jest/Enzyme at a component level.

``` shell
npm run test
```

* Coverage is always on, you can check also reports in /coverage/lcov-report/index.html.

* Snapshot testing is also included.

* E2E tests done in Cypress.


### Workflow

1) Dev/Prod environtment setup.
2) Design and structure of the components layout (cont vs pres), wireframes, etc.
3) Storybook up & running + first stateless components. Mocked info.
4) First tests Unit & Int. Leave Cypress ready in case I have time for E2E.
5) Leave routing ready in client.
6) Develop Login with all states on Storybook, mock data.
7) Bring login to app and connect with Redux store.
8) Add state persistency.
9) Same for planner tables.
10) Responsive/Compatibility check.
11) Animations.

### Notes

* ESLint + AirnBnB Styleguide is used for code linting.

* Storybook is used for component development, following the Component Driven Design (CDD) mindset. Snapshots and UI testing could be added there also. This is a common ground with designers also to improve the companies visual Styleguide and use it as a UI Explorer.

* I added 1 E2E test in Cypress showing how to trigger actions on Storybook. That way you can also run E2E tests on UI Explorers. In the sample you can check that the Button action is triggered by Cypress.

* I added React Router for routing to scale this app in the future.

* If you want to emulate a logout, you can use the route /login on the browser, it will just reset login info if logged. Any other routes (while logged) will just redirect to the Planner.

## Refactoring / Improvements

* Add Unit Testing for all components (missing Logo, View cases, etc)

* Texts should be FormattedMessages from react-intl (or similar intl libs) to support multilingual functionality.

* Bundles could be splitted using Webpack's code-splitter (chunks) and react-loadable.

* Stateless components and simple Stateful ones could be isolated in a global UI package to reuse it as a dependency, also for other projects. That way we can develop with a shared library of components. 

* When a proper Login system is created, login validation should be done on submit. Use something similar to this: https://redux-form.com/6.6.2/examples/submitvalidation/

* Finish all documentation in Storybook and format it a bit better with markdown (atm some components have that "show info" button, make that info available in all the UI explorer).

* A route could be added also for /planner/weekly/:idTime/book/:idSlot (or something like that). Then catch the idSlot to trigger the Booking modal on page load. Cool stuff if you want to pass direct links for booking to the user or let them share.

* TableHeader could be fixed also for long tables. 

* In case of really long slot rendering in tables (huge number of rows) we could use React Virtualized for dynamic & virtualized lists. Better performance.

* Dev environment could be made in Docker containers.

* Error handling for API calls. I could use status codes of Promises, error messages from the server, etc...

### Tech Stack
ReactJS, Redux, Glamorous, Storybook, Webpack4, Jest, Enzyme, Cypress.
