# StreakX 🔥🔥
A easy-to-use habit tracker which promotes the following of healthy habits. (Inspired by the book Atomic Habits by James Clear)

![StreakX](/assets/githubimages/streakx.PNG)

## Application Code
### Front-End
Development: React.js  
Deployment: Netlify

### Back-End
Server: Express.js  
Database: MongoDB  
Runtime Environment: Node.js

## User Validations
Users must first sign up for an account or log in from an existing account. There are some validations put in place to prevent the creation of identical accounts, missing fields or invalid users. When logging in, the backend would communicate with the front end to send data over and vice versa for signing up.

![Validation](/assets/githubimages/validate.gif)

## Create, Read and Update Habits
Upon logging in, users will be able to create a new habit based off whatever input they decide to give it. The date where the habit is started is tracked down and listed. Users would then be able to further take actions on these habits such as modifying the habit field or deleting it off the list

![CRUD](/assets/githubimages/crud.gif)

## Tracking Progression
Another action that the user can take on his/her habits is to complete it. This is done via ticking the checkbox under the actions tab. Ticking off a habit would then trigger the progression bar to move depending on how many habits are completed on that day.

![progress](/assets/githubimages/progress.gif)

## In Development (Finish Day, Profile)
Will be making this web app time based, by giving users a time limit before the day ends to complete their habits which would promote the reinforcement of completing such habits from day to day. The data would also be recorded in their profile.
