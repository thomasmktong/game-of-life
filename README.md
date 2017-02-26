# Game of Life Multiplayer

This is a *multiplayer* Web app version of [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) which demonstrates cellular automaton. It is modeled as a grid with 4 simple rules:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Implementation

This app used **Socket.io** for realtime communication and **ReactJS** for its speed (Virtual DOM) and modular design. A module is shared between the front and back end for logic in common.

## Try it Online

[Demo Site on Heroku](https://sleepy-lowlands-62986.herokuapp.com/)

## Run in Local

```
git clone https://github.com/thomasmktong/game-of-life.git

cd game-of-life
npm install
node server/app.js
```