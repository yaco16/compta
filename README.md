# The project
Import data with csv format from my accountancy software to this website
Present these datas graphicly with various charts

# Challenges
- import csv file into a database
- retrieve datas from the database by fetching endpoints in api back
- show these datas in a chart
- use different kinds of charts (bars, doughnut)
- use a cool sidebar (not a top nav bar)
- use a toggle button to switch between light and dark theme
- authentificate with Google account serverless (thanks to NextJS)

# Features desired
- add categories  to dashboard page : turnover, salary mass. What else ?
- add a toggle to change the language
- find how to protect routes with prefix
- create a custom login and logout page
- create a form to add user in database
- add tests
- create tva automatic calculation
- create annual accounts page
- add light form to choose which fiscal years to compare in overview page

# Problems to be fixed
- center vertically the spinner
- fix color of main
- fix left margin when screen becomes responsive
- fix delay in sidebar when connexion text appears
- improve css in upload form
- refactore upload component
- replace original datas with fake datas
- add spinner while loading charts pages


# Tech specs
## Front
- NextJS
- ChartJs : for the charts
- Papaparse : for parsing the csv files
- ProSideBar : used as the main componenet for the side bar
- Toastify : for handling the alert messages (success, error)
- Next-auth : for managing the user's session and the protected routes
- Sass : for managing a few CSS variables

## Back
- Express
- PgPromise : for managing the requests to the database

## Database
Free Postgresql database hosted by elephantsql.com
PgAdmin for testing the requests

# Getting Started
  ## Back
  ```bash
nodemon .\express\server.js
# or
yarn dev
```
  ## Front
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

