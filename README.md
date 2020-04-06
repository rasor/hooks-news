# hooks-news

## Intro

The code in this repository is based on the
[Awesome Apps with React Hooks and Firebase [Video]](https://www.packtpub.com/web-development/awesome-apps-with-react-hooks-and-firebase-video)
course by [Reed Barger](https://github.com/reedbarger/hooks-news).  
Code is forked from [carltonwin8/hooks-news](https://github.com/carltonwin8/hooks-news).  

The code has CRA frontend and Firebase backend and hosting at Firebase.  

## Using firebase CLI

Use `npm install -g firebase-tools` for firebase serverless backend functions.  
```bash
firebase --version
# 7.13.0
```
Get help: [Firebase CLI reference](https://firebase.google.com/docs/cli/?authuser=0#command_reference)  
Use Admin GUI: [Firebase Portal](https://console.firebase.google.com/?pli=1)

Use `firebase logout`, then `firebase login` to be authenciated at the cli.  
When you login you give Firebase CLI permission to access your GCP account.  
If you want to remove the permission goto [Apps with access to your account](https://myaccount.google.com/permissions?pli=1)

Create a project for your app in the [Firebase Portal](https://console.firebase.google.com/). Don't choose analytics, if you are just testing Firebase. 
Mine was named `hooks-news-rasor`

Use `firebase init functions` to initialize the `./functions` directory.  
Select `Use an existing project` - select the one you created.  
Language: Select Javascript, since this CRA is not set up for TypeScript.  
Select a number of options such as db, lang (js,ts), eslint, etc and then
install the node dependencies:
```bash
cd functions
npm install
cd ..
```

Edit `index.js` in the `./functions` folder. Add functions from the course:
```js
const functions = require("firebase-functions");

const admin = require("firebase-admin");

//const { firebaseConfig } = require("../src/firebase/config");
// const { LINKS_PER_PAGE } = require("../src/utils");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://hooks-news-rasor.firebaseio.com"
});

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.linksPagination = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    let linksRef = db.collection("links");
    const offset = Number(request.query.offset);
    const snapshot = await linksRef
      .orderBy("created", "desc")
      .limit(5)
      .offset(offset)
      .get();

    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    response.json(links);
  }
);
```
... to provide your backend.  
Verify you have no
* [authentication](https://console.firebase.google.com/project/hooks-news-rasor/authentication/users)
* [database (called Firestore)](https://console.firebase.google.com/project/hooks-news-rasor/database)
* [file storage](https://console.firebase.google.com/project/hooks-news-rasor/storage)
* [web hosting](https://console.firebase.google.com/project/hooks-news-rasor/hosting)  
* [serverless functions](https://console.firebase.google.com/project/hooks-news-rasor/functions)  
* or other resorces/features
... in your project yet.  

### Authentication

In [authentication/providers](https://console.firebase.google.com/project/hooks-news-rasor/authentication/providers) select Email/Password and enable.

### Web app - having DB and Storage

In [settings/general](https://console.firebase.google.com/project/hooks-news-rasor/settings/general/) goto the bottom right and **add a web app**. Again name it `hooks-news-rasor` and press **Register**.  
This will provide you with some code. Grap the part within the `<script>` tags:
```js
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaxxxxxxxxxxxxxxxxxxxx9VmkND65lJdtWUM",
    authDomain: "hooks-news-rasor.firebaseapp.com",
    databaseURL: "https://hooks-news-rasor.firebaseio.com",
    projectId: "hooks-news-rasor",
    storageBucket: "hooks-news-rasor.appspot.com",
    messagingSenderId: "682999999999",
    appId: "1:682999999999:web:89560ebd18605aaaaaaaaa"
  };
  
  // Remove these lines:
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  // Add this line:
  export default firebaseConfig;
```
save this to `/src/firebase/config.js` and 
* add the line with `export default firebaseConfig;` and
* comment out the `firebase.initializeApp` line.

Optionally upgrade your dependencies with `npm update`
Now get dependencies in your CRA project with `npm install`  

### Deploy backend functions

Then deploy only the functions folder with
`firebase deploy --only functions`.

Verify you now have one [serverless function](https://console.firebase.google.com/project/hooks-news-rasor/functions) (called `linksPagination`).  

### Test run locally

Build code via `npm run build`. If this goes well, then run the app in dev mode with `npm start`.  
This will open a broswer. Press `login` an add yourself as a user.  
You can see your account in [authentication/users](https://console.firebase.google.com/project/hooks-news-rasor/authentication/users).  

Now press `submit` and add a link.  

### Deploy frontend

Setup hosting `firebase init hosting`.  
Questions:  
_? What do you want to use as your public directory? (public)_ `build`  
_? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)_ `N`  
_? File build/index.html already exists. Overwrite? (y/N)_ `N`  
Info:  
_i  Writing configuration info to `firebase.json`..._  
_i  Writing project information to `.firebaserc`..._  

Use `firebase deploy` to deploy the functions and host the html.

Result from the deploy are:  
Project Console: https://console.firebase.google.com/project/hooks-news-rasor/overview  
Hosting URL: https://hooks-news-rasor.firebaseapp.com  
carltonwin8's Hosting URL: https://hooks-news-app-f32dc.firebaseapp.com   

The End.  
