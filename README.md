# Ratón
Ratón is a spanish-language learning app for beginners. On Ratón, users can read and interact with the vocab of spanish children's stories. All stories included are used with permission, courtesy of "The Spanish Experiment."

# Profile
On a user's profile, a list of Spanish vocab & definitions that have been added to a user's vocabularly learning list can be viewed. Users can also review any stories that they have finished reading.

https://gyazo.com/1301725b92d90c25ac922d05e3c0af13.mp4

# Stories
Users can view all stories that are available to read, which include the number of distinct and total vocabulary from that user's learning vocabulary list that occur in that story. Admins can also edit, delete, or post new stories (which involves simply pasting a URL from a story from "The Spanish Experiment.")

![Search Mode](/Raton/client/public/HomepageRaton.PNG)

# Reader
Here, users can read and interact with stories. The stories have been rebuilt in a way that lets users hover over words to view their English language translation. Users can click a word to add it to their vocabulary list (words on their list appear green), or click on a word that is already on their list to indicate that they are no longer studying it and that it should be removed from their reading list.

https://gyazo.com/c0b124a0b447536b7cbdc9d7b13a61a9.mp4

# ERD

![ERD](/Raton/client/public/RatonERD.PNG)

# Setting Up This Project:

## Starting Off

- Clone Repo
- Create .gitignore
- Setup SQL Server

## Set Up Firebase

- Go to Firebase console and create a new project
- Enable a "Sign-in method"
- NOTE: In the course we used the Email/Password sign-in method.
- Run SQL Script in this repo. Insert users with firebaseID information as needed
- Go to project settings to view API Key and Project ID (you'll need these in future steps)


## Server Side

- Install Nuget Packages (including firebase, react-router-dom, bootstrap, materialUI)
- Add connection string to appsettings.json
- Update appsettings.json to include your FirebaseProjectId
- Update Startup.cs to handle JWTs
- Update Startup.cs to call UseAuthentication before UseAuthorization
- Copy in the UserProfileRepository, IUserProfileRepository and UserProfileController from Tabloid/Gifter and modify as needed
- Register the UserProfileRepository with ASP.NET by calling services.AddTransient inside Startup.cs


## Client Side

- Create client directory and run npx create-react-app 
- Setup proxy in package.json
- Install firebase and react router using npm install react-router-dom firebase
- Install whatever component library you want
- Create a .env.local file in your client folder (DON'T forget the leading .) and add the firebase API Key
- Update the index.js file to add the call to firebase.initializeApp
- Copy in UserProfileProvider.js, Login.js, Register.js from Tabloid (and optionally copy in the Login.css file if you want that bootstrap styling)
- Copy in ApplicationViews.js from Tabloid/Gifter and remove code that's not needed
- Modify App.js to use the Router, UserProfileProvider, and ApplicationViews components

