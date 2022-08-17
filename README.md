# Trivia Me! : A React.js Solo coding project

This project was created on August 2022 for Juno College's project 3. [View live here.](https://trivia-main.netlify.app/)

## About

This project is powered by [Open Trivia API](https://opentdb.com/api_config.php), which is then combined with React.js and a little bit of Firebase. Players can have the default params (which is mixed categories and mixed difficulty), or choose from a wide range of difficulties. When players are done with the quiz, a results page will show the summary and players can choose to save their scores to the [community scoreboard](https://trivia-main.netlify.app/scoreboard). 

Note: As the players makes their submissions, the timestamp is taken down to the millesecond and pushed to Firebase as well. This is then used to sort the player data in descending order on the scoreboard so it shows up at the top. This is done to improve the user experience so users do not have to scroll down.

## Tools

* React
* Javascript
* Firebase
* REST API
* XML
* CSS3

## What did I learn?

Using useState effectively and how to pass API data effectively through different components through the use of props. I also got a little familar with hooking my react app with Firebase in terms of pushing player data.

## What did I struggle with?

I had a hard time getting my app to work with React Router. My stretch goal was to make my app a multipage website. But due to the way I coded the logic of my app, it was proven a little difficult because my components relied on the API data state.

## So what do I want to add/improve on?

* Making it multipage with React Route someday
* Sort by date, score, category button in scoreboard section
* Adding sounds (correct ding, wrong buzz)

## Other works
See [My Portfolio](https://chxw.dev/) for other projects and shenanigans 💃🥳⌨