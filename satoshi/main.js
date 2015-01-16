
// Default to a recent block
var defaultBlockID = 339000 - Math.round(10000 * Math.random());

// Number of levels
var levelCount = 12;

// List of block ids
var blockIDs = [];
for (var i = 0; i < levelCount; i++) {
  blockIDs.push(defaultBlockID - i);
}

// Prepares a new game
var setupGame = function() {
    Satoshi.setDefaultMap("block-" + defaultBlockID);
    Satoshi.loadMaps(blockIDs, startGame);
};

// Starts the game
var startGame = function() {
    Satoshi.loadMario();
}

// Let's do this!
setupGame();
