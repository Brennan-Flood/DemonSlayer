# Demon Slayer

## Live Site
  [Demon-Slayer](https://brennan-flood.github.io/DemonSlayer/)

## Technologies
  * JavaScript
  * Canvas
  * Webpack
  * Node
  * Firebase
 
## Overview
  DemonSlayer is a browser-based 2D game inspired in gameplay by the Castlevania franchise, and in artwork by the animated television series *Demon Slayer*. The game utilizes HTML5's Canvas as the rendering medium, and JavaScript to handle the game's functionality.
  
 The Objects that are seen on the main Canvas element each have their own move and draw methods, and are created and stored in one Game object. The Game object also has a method that invokes each of these sub-object's move and draw methods. 
 
 Animation and the managedment of frame-rate is handled by means of a Render object, which also invokes the Game object's move and draw methods at the specified interval.
