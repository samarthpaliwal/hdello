# hdello

hdello is a small virtual pet page written in 2021 with p5.js and p5.play. A dog sprite sits on a green canvas next to a stock of milk bottles. Two buttons let you add food to the stock or feed the dog; feeding consumes one bottle, switches the dog to its happy image, and records the hour it was last fed. The food count and feed time live in a Firebase Realtime Database, so the state is shared between everyone who opens the page.

## Requirements

- A modern desktop browser with JavaScript enabled.
- A local static file server; `file://` loading may block the image files.
- Internet access at runtime for the p5.js 0.9.0 and Firebase 8.4.3 CDN scripts and for the database.
- A Firebase Realtime Database. The config in `index.html` points at a project named `you-need-some-milk-92799`; if that project is no longer live, substitute your own.

## Setup

```bash
git clone https://github.com/samarthpaliwal/hdello.git
cd hdello
```

To use your own Firebase project, create a Realtime Database and replace the `firebaseConfig` object in `index.html`. The page reads and writes two root keys: `Food` (number of milk bottles) and `FeedTime` (hour of day, 0 to 23). Seed `Food` with a number such as `20` before the first run, otherwise the stock starts as `null`.

## Usage

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

Controls (both are HTML buttons placed above the canvas):

- `Add Food` increments the `Food` value in the database by one.
- `Feed The Dog` changes the dog to the happy image, decrements `Food` by one (never below zero), and writes the current hour to `FeedTime`.

The last feed time is drawn at the top of the canvas as `Lastfeed:<hour>am` or `pm`.

## How it works

`sketch.js` creates a 1000 by 400 canvas, builds a `Food` object, attaches a listener to the `Food` database key, and creates the dog sprite and the two buttons. In `draw()` it repaints the background, calls `Food.display()`, reads `FeedTime` from the database, formats the hour, and draws the sprites. `Food.js` keeps the current stock, loads `Milk.png`, and draws one small bottle per unit of food in rows of ten plus a larger bottle beside the dog. Database writes happen only in the two button handlers; every connected browser receives the updates through the `on("value")` listener.

## Project layout

```
index.html       CDN scripts, Firebase config, script includes
sketch.js        setup, draw, button handlers, database listeners
Food.js          Food class: stock count and milk bottle rendering
p5.play.js       vendored p5.play library
Dog.png          default dog image
happy dog.png    image shown after feeding
Milk.png         milk bottle sprite
milkImage.png    unused alternate bottle image
style.css        canvas position and border
```
