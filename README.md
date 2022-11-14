# StreakX 🔥🔥
A easy-to-use habit tracker which promotes the following of healthy habits. (Inspired from the book: Atomic Habits by James Clear)

![StreakX](/assets/githubimages/streakx.PNG)

## Application Code
### Front-End
Development: React.js  
Deployment: Netlify  
The front end makes use of React to organise the web app into reusable components and also manage the states of certain elements or objects. Axios is also used to make API calls to the back end.

### Back-End
Server: Express.js  
Database: MongoDB  
Deployment: Heroku  
Runtime Environment: Node.js  
The back end consists of Express in order to send or receive HTTP requests from the front end and MongoDB for the manipulation and storage of data.

## User Validations
Users must first sign up for an account or log in from an existing account. There are some validations put in place to prevent the creation of identical accounts, missing fields or invalid users. When logging in, the back end would communicate with the front end to send data over and vice versa for signing up.

![Validation](/assets/githubimages/validate.gif)

## Create, Read and Update Habits
Upon logging in, users will be able to create a new habit based off whatever input they decide to give it. The date where the habit is started is tracked down and listed. Users would then be able to further take actions on these habits such as modifying the habit field or deleting it off the list. Everytime the list is altered, data is constantly sent back and forth between the front and back end and eventually the list is called in the re-render using the useEffect react hook.

![CRUD](/assets/githubimages/crud.gif)

## Tracking Progression
Another action that the user can take on his/her habits is to complete it. This is done via ticking the checkbox under the actions tab. Ticking off a habit would then trigger the progression bar to move depending on how many habits are completed on that day.

![progress](/assets/githubimages/progress.gif)

## In Development (Finish Day, Profile)
Will be making this web app time based, by giving users a time limit before the day ends to complete their habits which would promote the reinforcement of completing such habits from day to day. The data would also be recorded in their profile.
