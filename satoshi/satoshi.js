
var FSM = FullScreenMario;
var Satoshi = FSM.prototype.satoshi = {};

// A shared map library
Satoshi.library = FSM.prototype.settings.maps.library;

// The classic maps
Satoshi.classicMaps = [];
for (var key in Satoshi.library) {
  Satoshi.classicMaps.push(Satoshi.library[key]);
}

// Adds a new map
Satoshi.addMap = function(map) {
  console.log("Adding map: " + map.name);
  FSM.prototype.settings.maps.library[map.name] = map;
};

// Sets the default map
Satoshi.setDefaultMap = function(name) {
  console.log("Setting default map: " + name);
  FSM.prototype.settings.maps.mapDefault = name;
};

// Calculates value of transaction outputs
Satoshi.getValue = function(tx) {
  var value = 0;
  for (var i = 0; i < tx.outputs.length; i++) {
    value += tx.outputs[i].value;
  }
  return value;
};

// Adds coins to a map area
Satoshi.addCoins = function(area, x, y, w, h, d) {
  w = w || 1;
  h = h || 1;
  d = d || 1;
  area.creation.push({
    "macro": "Fill",
    "thing": "Coin",
    "x": x,
    "y": y,
    "xnum": w*d,
    "ynum": h*d,
    "xwidth": 8/d,
    "yheight": 16/d
  });
};

// Prepares an existing map area
Satoshi.setupArea = function(area, block) {

  // Add coins for block
  for (var i = 0; i < block.txs.length && i < 1000; i++) {
    var tx = block.txs[i];
    var d = Math.log(Satoshi.getValue(tx));
    var x = i * 10;
    var y = Math.min(10, tx.inputs.length) * 4 + 6;
    var w = Math.min(10, tx.outputs.length);
    var h = Math.min(10, d)
    Satoshi.addCoins(area, x, y, w, h, d);
  }

  // Set next map
  var items = area.creation;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.macro == "EndInsideCastle" ||
        item.macro == "EndOutsideCastle") {
      item.transport = { "map": "block-" + (block.block_no - 1) };
    }
  }
};

// Builds a map for given block
Satoshi.buildMap = function(block) {
  var name = "block-" + block.block_no;
  var defaults = Satoshi.classicMaps[(block.block_no - 1) % 31];
  var config = {
    name: name
  };
  var map = $.extend({}, defaults, config);

  // Setup map areas
  for (var i in map.areas) {
    Satoshi.setupArea(map.areas[i], block);
  }

  console.log("Map: ", map);
  return map;
};

// Gets a block by number or hash
Satoshi.getBlock = function(id, callback) {
  var url = "https://chain.so/api/v2/block/BTC/" + id;
  $.get(url, function(response) {
    console.log("Got block " + id + ": ", block);
    var block = response.data;
    callback(block);
  });
};

// Loads maps for block ids
Satoshi.loadMaps = function(blockIDs, callback) {
  var idCount = blockIDs.length;
  var mapCount = 0;

  // Get the blocks
  $(blockIDs).each(function() {
    var id = this;

    // Create each map
    Satoshi.getBlock(id, function(block) {
      var map = Satoshi.buildMap(block);
      Satoshi.addMap(map);
      mapCount++;

      // Run callback when maps are loaded
      if (mapCount == idCount) {
        callback();
      }
    });
  });
}
