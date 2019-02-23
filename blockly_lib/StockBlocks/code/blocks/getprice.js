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
  "message0": "Get Price of %1 %2",
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
      "min": -10000,
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
  "tooltip": "Place a Market Order",
  "helpUrl": ""
  }
                                  
]);

 Blockly.Python['getprice'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     // TODO: Assemble Python into code variable.
     var code = "getPrice(" + dropdown_stock + ")";
     // TODO: Change ORDER_NONE to the correct strength.
     return [code, Blockly.Python.ORDER_NONE];
 };

Blockly.Python['buy'] = function(block) {
    var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
    var number_quantity = block.getFieldValue('QUANTITY');
    var value_stocks = Blockly.Python.valueToCode(block, 'STOCKS', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'buy('  + dropdown_stock + ',' + number_quantity + ')';
    return code;
}
