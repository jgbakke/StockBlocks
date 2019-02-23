Blockly.defineBlocksWithJsonArray([{
  "type": "getprice",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STOCK",
      "options": [
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
      ]
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
}]);

 Blockly.Python['getprice'] = function(block) {
     var dropdown_stock = JSON.stringify(block.getFieldValue('STOCK'));
     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
     // TODO: Assemble Python into code variable.
     var code = "getPrice(" + dropdown_stock + ")";
     // TODO: Change ORDER_NONE to the correct strength.
     return [code, Blockly.Python.ORDER_NONE];
 };
