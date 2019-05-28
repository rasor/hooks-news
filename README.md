# Bulliting Group

The code in this repository is based on the
[Amazing Apps with React Hooks and Firebase](https://www.codeartistry.io/p/amazing-apps-with-react-hooks-and-firebase)
course.

Use `yarn global add firebase-tools` for firebase serverless backend functions.
Use `firebase logout`, then `firebase login` to be authenciated at the cli.
Use `firebase init functions` to initialize the `./functions` directory.
Select a number of options such as db, lang (js,ts), eslint, etc and then
install the node dependencies. Edit `index.js` in the `./functions` folder
to provide your backend. The deploy only the functions folder with
`firebase deploy --only functions`.
