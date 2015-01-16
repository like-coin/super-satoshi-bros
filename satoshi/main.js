
// Default to a recent block
var defaultBlockID = 339000 - Math.round(10000 * Math.random());
var defaultMap = "block-" + defaultBlockID;

// Number of levels
var levelCount = 12;

// List of block ids
var blockIDs = [];
for (var i = 0; i < levelCount; i++) {
  blockIDs.push(defaultBlockID - i);
}

// Prepares a new game
var setupGame = function() {
  Satoshi.setDefaultMap(defaultMap);
  Satoshi.loadMaps(blockIDs, startGame);
};

// Starts the game
var startGame = function() {
  Satoshi.addTitleScreen(Satoshi.library[defaultMap]);
  Satoshi.loadMario();
}

// Let's do this!
setupGame();
