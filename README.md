
# Super Satoshi Bros

## Overview

[Super Satoshi Bros](http://qualiabyte.github.io/super-satoshi-bros/) is a version of the classic NES game which replaces all of the original coins with new coins representing transaction outputs of the Bitcoin blockchain. It's a minor fork of the [FullScreenMario](https://github.com/Diogenesthecynic/FullScreenMario-JSON) project which implements Super Mario Bros using HTML5 and JavaScript.

## Details

Super Satoshi Bros is a version of the classic NES game which replaces all the original coins with new coins representing transaction outputs of the Bitcoin blockchain, in a way that nearly any transaction can be represented. The game begins in a random world corresponding to a recent block, one of the last 10,000. From here, the game continues in reverse direction, towards the original genesis block.

For example, the map for each block is given by:

    Satoshi.classicMaps[(block.block_no - 1) % 31]

And the relation between the new coins and Bitcoin transactions is given by this method in [satoshi/satoshi.js](satoshi/satoshi.js):

    // Adds coins to map area for a given block
    Satoshi.addCoinsForBlock = function(area, block) {
      for (var i = 0; i < block.txs.length && i < 100; i++) {
        var tx = block.txs[i];
        var d = Math.log(Satoshi.getValue(tx));
        var x = i * 100;
        var y = Math.min(10, tx.inputs.length) * 4 + 6;
        var w = Math.min(10, tx.outputs.length);
        var h = Math.min(10, d);
        Satoshi.addCoins(area, x, y, w, h, d);
      }
    };

So this means that a transaction's output value roughly corresponds to both the height and density of each batch of coins onscreen, while the width increases with the number of transaction outputs. This explains the large group of coins at the very start of each level, representing the coinbase transaction for the world corresponding to the current block.

Similarly, the transactions are evenly spaced horizontally throughout the level, but their vertical position increases with the number of transaction inputs -- so these might be valuable, but also become harder to reach.

## Current Limitations

+ On game start, blocks are only loaded for the next 4 levels

## Credits

The project is a minor fork of the [FullScreenMario](https://github.com/Diogenesthecynic/FullScreenMario-JSON) project, and would not be possible without either it or the original game.
