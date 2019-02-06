$(document).ready(function(){
  var inputValueA = null;
  var inputValueB = null;
  var previousButton = null;

  $(".button").on('click', function(){
    // console.log("click: this.value = " + this.value);
    handleInput(this.value, "up");
    this.blur();
  });

  $(document).on('keydown', function(e) {
    // console.log("keydown: e.key = " + e.key);
    handleInput(e.key, "down");
  });

  $(document).on('keyup', function(e) {
    // console.log("keyup: e.key = " + e.key);
    handleInput(e.key, "up");
  });

  function calculateResult(){
    var theCurrentOperator = currentOperator();
    var theResult = null;
    // console.log("calculateResult: theCurrentOperator = " + theCurrentOperator + "; inputValueA: " + inputValueA + "; inputValueB = " + inputValueB);

    if (theCurrentOperator != null && inputValueA != null && inputValueB != null) {
      // console.log("theCurrentOperator = " + theCurrentOperator);
      if (theCurrentOperator === "+") {
        // console.log("add: " + eval(inputValueA + "+" + inputValueB));
        theResult = eval(inputValueA + "+" + inputValueB);
      } else if (theCurrentOperator === "-") {
        // console.log("subtract: " + eval(inputValueA + "-" + inputValueB));
        theResult = eval(inputValueA + "-" + inputValueB);
      } else if (theCurrentOperator === "*") {
        // console.log("multiply: " + eval(inputValueA + "*" + inputValueB));
        theResult = eval(inputValueA + "*" + inputValueB);
      } else if (theCurrentOperator === "/") {
        // console.log("divide: " + eval(inputValueA + "/" + inputValueB));
        theResult = eval(inputValueA + "/" + inputValueB);
      }
      // console.log("calculateResult: theCurrentOperator = " + theCurrentOperator + "; theResult = " + theResult);
    }

    return theResult;
  }

  function currentOperator(){
    var currentOperation = null;

    if ($("#btnDivide").css("background-color") === "rgb(255, 255, 255)" &&
        $("#btnDivide").css("color") === "rgb(255, 165, 0)"){
          currentOperation = "/";
    } else if ($("#btnMultiply").css("background-color") === "rgb(255, 255, 255)" &&
        $("#btnMultiply").css("color") === "rgb(255, 165, 0)"){
          currentOperation = "*";
    } else if ($("#btnSubtract").css("background-color") === "rgb(255, 255, 255)" &&
        $("#btnSubtract").css("color") === "rgb(255, 165, 0)"){
          currentOperation = "-";
    } else if ($("#btnAdd").css("background-color") === "rgb(255, 255, 255)" &&
        $("#btnAdd").css("color") === "rgb(255, 165, 0)"){
          currentOperation = "+";
    }

    return currentOperation;
  }

  function eventClear(value, event){
    toggleButton("#btnClear", event);
    if (event === "up") {
       $("#txtScreen").val("");
      inputValueA = null;
      inputValueB = null;
      previousButton = null;
      resetFunctions();
    }
  }

  function eventEquals(value, event){
    var newValue = null;

    // console.log("eventEquals: $('#txtScreen').val() = " + $("#txtScreen").val() + "; event = " + event);

    if (value.toLowerCase() === "equals"){
      toggleButton("#btnEqual", event);
    }

    if (event === "up")
    {
      // store to inputValueB
      if (value.toLowerCase() === "equals"){
        // console.log("eventEquals: $('#txtScreen').val() = " + $("#txtScreen").val());
        updateInputVariables($("#txtScreen").val());
      }

      // console.log("eventEquals calling calculateResult");
      var calculation = calculateResult();
      if (calculation != null){
        // update the screen with the variables, reset
        $("#txtScreen").val(calculation);
        inputValueA = null;
        inputValueB = null;
        previousButton = "equals";
        resetFunctions();
      }
    }
  }

  function eventNegative(value, event){
    // console.log("eventNegative: value = " + value + "; event = " + event);
    toggleButton("#btnNegative", event);

    if (event === "up"){
      if ($("#txtScreen").val() != "") {
        var newValue = eval($("#txtScreen").val() + "*-1");

        if ($("#txtScreen").val() == inputValueA) {
          inputValueA = newValue;
        } else if ($("#txtScreen").val() == inputValueB) {
          inputValueB = newValue;
        }

        $("#txtScreen").val(newValue);
      }
    }
  }

  function eventPercent(value, event){
    toggleButton("#btnPercent", event);

    if (event === "up"){
      if ($("#txtScreen").val() != "") {
        var newValue = eval($("#txtScreen").val() + "/100");

        if ($("#txtScreen").val() == inputValueA) {
          // console.log("eventPercent: inputValueA = " + inputValueA);
          inputValueA = newValue;
          // console.log("eventPercent: inputValueA = " + inputValueA);
        } else if ($("#txtScreen").val() == inputValueB) {
          // console.log("eventPercent: inputValueB = " + inputValueB);
          inputValueB = newValue;
          // console.log("eventPercent: inputValueB = " + inputValueB);
        }

        $("#txtScreen").val(newValue);
      }
    }
  }

  function eventBackspace(value, event){
    if (event === "up"){
      var screen = $("#txtScreen").val();
      // console.log("eventBackspace: value = " + value + "; event = " + event);
      // console.log("eventBackspace: screen = " + screen);

      screen = screen.substring(0, screen.length - 1);
      //console.log("eventBackspace: screen = " + screen);

      $("#txtScreen").val(screen);
    }
  }

  function eventOther(value, event){
    var updateScreen = false;

    if (value == 0) { toggleButton("#btn0", event); updateScreen = true; }
    else if (value == 1) { toggleButton("#btn1", event); updateScreen = true; }
    else if (value == 2) { toggleButton("#btn2", event); updateScreen = true; }
    else if (value == 3) { toggleButton("#btn3", event); updateScreen = true; }
    else if (value == 4) { toggleButton("#btn4", event); updateScreen = true; }
    else if (value == 5) { toggleButton("#btn5", event); updateScreen = true; }
    else if (value == 6) { toggleButton("#btn6", event); updateScreen = true; }
    else if (value == 7) { toggleButton("#btn7", event); updateScreen = true; }
    else if (value == 8) { toggleButton("#btn8", event); updateScreen = true; }
    else if (value == 9) { toggleButton("#btn9", event); updateScreen = true; }
    else if (value == "/") { eventOperation("#btnDivide", event, "/"); }
    else if (value == "*") { eventOperation("#btnMultiply", event, "*"); }
    else if (value == "-") { eventOperation("#btnSubtract", event, "-"); }
    else if (value == "+") { eventOperation("#btnAdd", event, "+"); }
    else if (value == ".") { toggleButton("#btnDecimal", event); updateScreen = true; }

    if (event === "up") {
      if (updateScreen){
        if (previousButton === "operator" || previousButton === "equals"){
          // console.log("operator: value = " + value);
          $("#txtScreen").val("");
          previousButton = null;
          // console.log("eventOther: previousButton = " + previousButton);
        }

        var newValue = $("#txtScreen").val() + value;
        // console.log("updateScreen: value = " + value + "; $('#txtScreen').val() = " + $("#txtScreen").val() + "; newValue = " + newValue);
        $("#txtScreen").val(newValue);
        // console.log("updateScreen: value = " + value + "; $('#txtScreen').val() = " + $("#txtScreen").val());
      }
    }
  }

  function eventOperation(elementID, event, newOperator){
    if (event === "up") {
      // console.log("eventOperation: inputValueA = " + inputValueA + "; inputValueB = " + inputValueB + "; newOperator = " + newOperator);
      previousButton = "operator";

      //if function already highlighted, complete the operation; then highlight new function
      if (currentOperator() == null) {
        toggleFunction(elementID, event);
      }

      updateInputVariables($("#txtScreen").val());

      // console.log("eventOperation calling calculateResult");
      var calculation = calculateResult();
      if (calculation != null){
        updateInputVariables(calculation);
        $("#txtScreen").val(calculation);

        toggleFunction(elementID, event);
      }
    }
  }

  function handleInput(value, event) {
    // console.log("handleInput: value = " + value + "; event = " + event + "; operator = " + operator + "; inputValueA = " + inputValueA + "; inputValueB = " + inputValueB);

    if (value.toLowerCase() === "clear" || value.toLowerCase() === "escape"){
      eventClear(value, event);
    } else if (value.toLowerCase() === "equals" || value.toLowerCase() === "enter") {
      eventEquals("equals", event);
    } else if (value.toLowerCase() === "negative") {
      eventNegative(value, event);
    } else if (value.toLowerCase() === "percent") {
      eventPercent(value, event);
    } else if (value.toLowerCase() === "backspace") {
      eventBackspace(value, event);
    } else {
      eventOther(value, event);
    }
  }

  function resetFunctions() {
    $("#btnDivide").css("background-color", "orange");
    $("#btnDivide").css("color", "black");

    $("#btnMultiply").css("background-color", "orange");
    $("#btnMultiply").css("color", "black");

    $("#btnSubtract").css("background-color", "orange");
    $("#btnSubtract").css("color", "black");

    $("#btnAdd").css("background-color", "orange");
    $("#btnAdd").css("color", "black");
  }

  function toggleButton(elementID, event) {
    if (event === "down") {
      $(elementID).css("opacity", "0.1");
    } else if (event === "up") {
      $(elementID).css("opacity", "1");
    }
  }

  function toggleFunction(elementID, event) {
    if (event === "up"){
      // console.log("toggleFunction: elementID = " + elementID);
      // console.log("toggleFunction: $elementID = " + $(elementID));
      // console.log("toggleFunction: $(elementID).css('background-color') = " + $(elementID).css("background-color"));
      // console.log("toggleFunction: $(elementID).css('color') = " + $(elementID).css("color"));

      resetFunctions();

      $(elementID).css("background-color", "white");
      $(elementID).css("color", "orange");
    }
  }

  function updateInputVariables(value) {
    // console.log("updateInputVariables entry: inputValueA = " + inputValueA + "; inputValueB = " + inputValueB);

    if (inputValueA != null && inputValueB != null){
      inputValueA = value;
      inputValueB = null;
    } else {
      if (inputValueA === null) {
        inputValueA = value;
      } else if (inputValueB === null) {
        inputValueB = value;
      }
    }
    // console.log("updateInputVariables exit: inputValueA = " + inputValueA + "; inputValueB = " + inputValueB);
  }
});
