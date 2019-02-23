stocks = [
          [
           "TSLA",
           "TSLA"
           ],
          [
           "EA",
           "EA"
           ],
          [
           "AAPL",
           "AAPL"
           ]
          ];


Blockly.defineBlocksWithJsonArray([{
  "type": "getprice",
  "message0": "Price of %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Price",
  "helpUrl": ""
},

  {
  "type": "volume",
  "message0": "Volume of %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Volume",
  "helpUrl": ""
  },
  
  
  {
  "type": "quantity",
  "message0": "Quantity of %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Quantity of shares you own",
  "helpUrl": ""
  },
  
  {
  "type": "percent_change",
  "message0": "% Change of %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Daily Percent Change of the Stock",
  "helpUrl": ""
  },
  
  
  {
  "type": "vwap",
  "message0": "VWAP of %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Volume Weighted Average Price",
  "helpUrl": ""
  },
  
                                  
  {
  "type": "buy",
  "message0": "Buy %2 shares of %1 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "field_number",
      "name": "QUANTITY",
      "value": 0,
      "min": 0,
      "max": 10000
    },
    {
      "type": "input_value",
      "name": "STOCKS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "Place a Market Order to buy",
  "helpUrl": ""
  },
  
  {
  "type": "sell",
  "message0": "Sell %2 shares of %1 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": stocks
    },
    {
      "type": "field_number",
      "name": "QUANTITY",
      "value": 0,
      "min": 0,
      "max": 10000
    },
    {
      "type": "input_value",
      "name": "STOCKS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "Place a Market Order to sell shares",
  "helpUrl": ""
  },
  
  
  {
  "type": "portfoliocash",
  "message0": "Cash in Account",
  "output": "Number",
  "colour": 20,
  "tooltip": "Get the Amount of Cash in your Account",
  "helpUrl": ""
  }
                                  
]);

Blockly.Python['getprice'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     var code = "get_price(" + dropdown_stock + ")";
     return [code, Blockly.Python.ORDER_NONE];
 };

Blockly.Python['volume'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     var code = "get_volume(" + dropdown_stock + ")";
     return [code, Blockly.Python.ORDER_NONE];
 };

 Blockly.Python['quantity'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     var code = "stock_quantity(" + dropdown_stock + ")";
     return [code, Blockly.Python.ORDER_NONE];
 };

 Blockly.Python['percent_change'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     var code = "get_percent_change(" + dropdown_stock + ")";
     return [code, Blockly.Python.ORDER_NONE];
 };

 Blockly.Python['vwap'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     var code = "get_vwap(" + dropdown_stock + ")";
     return [code, Blockly.Python.ORDER_NONE];
 };

Blockly.Python['buy'] = function(block) {
    var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
    var number_quantity = block.getFieldValue('QUANTITY');
    var value_stocks = Blockly.Python.valueToCode(block, 'STOCKS', Blockly.Python.ORDER_ATOMIC);
    var code = "buy("  + dropdown_stock + "," + number_quantity + ")\n";
    return code;
}

Blockly.Python['sell'] = function(block) {
    var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
    var number_quantity = block.getFieldValue('QUANTITY');
    var value_stocks = Blockly.Python.valueToCode(block, 'STOCKS', Blockly.Python.ORDER_ATOMIC);
    var code = "sell("  + dropdown_stock + "," + number_quantity + ")\n";
    return code;
}

Blockly.Python['portfoliocash'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "portfolio_cash()";
  return [code, Blockly.Python.ORDER_NONE];
};
