
// Default to a recent block
var defaultBlockID = 339000 - Math.round(10000 * Math.random());

// Get the block
Satoshi.getBlock(defaultBlockID, function(block) {
  console.log("Received block " + defaultBlockID + ": ", block);

  // Create a map
  var startMap = Satoshi.buildMap(block);
  Satoshi.addMap(startMap);
  Satoshi.setDefaultMap(startMap.name);

  // Start the game
  Satoshi.loadMario();
});
