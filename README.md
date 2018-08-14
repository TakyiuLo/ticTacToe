# Tic Tac Toe

## Game Explanation:
Tic Tac Toe is a 3x3 grid game. The game start by first player placing "X" on a 
cell and change turns. For other player, he/she will place an "O" on a valid
cell. Players switch back and forward until all space is ocupy or one have three
spots in a row, col, or diagonally.

## Techniques:
This project is mainly for training purposes such as Git, HTML, CSS, Javascript,
Ajax etc.
- These are techniques that I used.
  - Techs:
    - HTML: The basic layout for view
    - CSS: Styling the html such as animation, color, position etc.
    - SASS: A "better" CSS. It's a framework.
    - Javascript: The magical logics happens here.
    - JQuery: Using it for its magical query selection
    - Ajax: This is where I request a response to server
    - CRUD: Create, Read, Update, Delete; These are for Single Page Application
    - Promises: Using it for requests handlers; if success..., if fail...
    - Git: Command line tools
    - GitHub: To host the page
    - Atom: A web developer IDE
    - curl-scripts: a command line tool for requests
    - grunt: for deployment
    - NodeJS: (UNKOWN) behind scenes

## Purposes:
- One of the purpose of this project is to create a file tree that is sementic.
  The main course goes like this:
  - index.html -> scripts/styles -> auth/game -> app -> events -> api -> ui
- Another purpose is to code reusable codes
- Practice more programming fundamentals
- Practice more html layouts
- Practice more styling
- Study an API given documentation
- Understand Git work flow such as version control, and feature branches
- Commit frequently
- Debugging tools such as chrome dev tool, and console.log

## Features:
- A working Tic Tac Toe game
- Multiple games
- Communicating with server
- update the server before update the game logic
- Authorization: sign up, sign in, sign out, change password
- Feedback to user for each action
- Ajax with providing API

## Furture Features:
- Multiplayer
- Animation between sign in and sign out

## Bugs:
-  N/A: let me know if you find any

## Plan: 
At first I was confuse where to start so I start reading the api documentation
that I am gonna use. Then I draw my wireframe and write my user stories. The on
going steps are following:
  - read the documentation again to understand what it requires
  - create a template
  - create a understandable file tree
  - then start in the index files
    ...
The on going is to create files that I had practice with. I usually start with
creating a branch where I can test for. Then if something work I merge into
master. For instance, if I need to refactor codes, I create a new branch and
do it there until I can solve it. However, sometimes I got stuck. Personally,
I like to break apart from thinking about it. Then I come back after a break
with a new mind set. If there are still any problems I couldn't solve, I would
simply issue a problem in a queue such as the current project issues stack,
slack, and maybe Stack Overflow. The main part is that I won't be breaking any
codes when I test. So then I could come back later.

A few issues that I still have are:
- I couldn't get the gameboard animation to work everytime I create a new game.
- I couldn't make a better hamburger icon.
- I couldn't understand the multiplayer documentation.
- etc.

## User Stories:

  ### Authentication
    - As a non-registered user, I would like to sign up with email and password

    - As a non-registered user who signs up with an already used email then I should receive an error
    - As a non-registered user who signs up with an new email then I should receive a success message
    - As a registered user, I would like to sign in with email and password

    - As a registered user who signs in with an incorrect password then I should receive an error
    - As a registered user who signs in with a correct password then I should receive a success message
    - As a signed in user, I would like to change my password

    - As a registered user who signed in and change my password with a successful message.
    - As a registered user who signed in who typed my incorrect old password, I should receive
      an error message.
    - As a registered user who signed in who typed in my incorrect new password confirmation, I should
      receive am error message.
    - As a registered user who signed in, I would like to sign out my account

    - As a registered user who signed in and wanted to sign out, I receive a successful message.
    - As a registered user who signed in and wanted to sign out, I should receive a error message on
    - failing to sign out.
    - As a registered user who successfully signed out, I should have a page to sign back in.

  ### Game
    - As a signed in user, I would like to play tic tac toe
    - As a signed in user, I would like to click a button to start a new game
    - As a signed in user who started a new game, I would like to click a square to add my first X
    - As a signed in user who started a new game, I would like to click a square to add the next O and
    - then repeat until a winner or tie
    - As a signed in user who tie a game, I would like to see a tie message.
    - As a signed in user who won a game, I would like to see a winning message indicating X or O player
      win.
  - As a signed in user, I would like to see how many games did I win.
  ### Wireframe:
    - A very simple wireframe
      [Imgur] https://imgur.com/a/s3MDniv
