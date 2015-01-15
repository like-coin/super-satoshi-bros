
var FSM = FullScreenMario;
var Satoshi = FSM.prototype.satoshi = {};

// A shared map library
Satoshi.library = FSM.prototype.settings.maps.library;

// The classic maps
Satoshi.classicMaps = [];
for (var key in Satoshi.library) {
  Satoshi.classicMaps.push(Satoshi.library[key]);
}

// Adds coins to an existing map
Satoshi.addCoins = function(map, x, y, w, h, d) {
  w = w || 1;
  h = h || 1;
  d = d || 1;
  map.areas[0].creation.push({
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

// Builds a map for given block
Satoshi.buildMap = function(block) {
  var name = "block-" + block.block_no;
  var defaults = Satoshi.testMap;
  var config = {
    name: name
  };
  var map = $.extend({}, defaults, config);
  for (var i = 0; i < block.txs.length && i < 1000; i++) {
    var tx = block.txs[i];
    var d = Math.log(Satoshi.getValue(tx));
    var x = i * 10;
    var y = Math.min(10, tx.inputs.length) * 4 + 6;
    var w = Math.min(10, tx.outputs.length);
    var h = Math.min(10, d)
    Satoshi.addCoins(map, x, y, w, h, d);
  }
  console.log("Building map: " + name);
  console.log("Map : ", map);
  return map;
};

// Gets a block by number or hash
Satoshi.getBlock = function(id, callback) {
  var url = "https://chain.so/api/v2/block/BTC/" + id;
  $.get(url, function(response) {
    var block = response.data;
    callback(block);
  });
};
