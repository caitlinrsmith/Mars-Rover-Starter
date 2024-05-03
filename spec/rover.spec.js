const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

   // test 7

   test("constructor sets position and default values for mode and generatorWatts", function() {
    let roverOne = new Rover(98382);
    expect(roverOne.position).toEqual(98382);
    expect(roverOne.mode).toEqual("NORMAL");
    expect(roverOne.generatorWatts).toEqual(110);
  });

  // test 8

  test("response returned by receiveMessage contains the name of the message", function() {
    let newCommand = new Command ("go", "down")
    let letsMove = new Message("Let's move", newCommand);
    let roverOne = new Rover(98382);
    let response = roverOne.receiveMessage(letsMove);
    expect(response.message).toEqual("Let's move");
  });

  // test 9

    test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
      let manyCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message ("Sending Many Commands", manyCommands);
      let roverOne = new Rover(98382);
      let response = roverOne.receiveMessage(message);
      expect(response.results.length).toEqual(2);
    });

// test 10

    test("responds correctly to the status check command", function() {
      let statusCommand = [new Command("STATUS_CHECK")];
      let message = new Message ("Status check", statusCommand);
      let roverOne = new Rover(98382);
      let response = roverOne.receiveMessage(message);
      expect(response.results[0].roverStatus.position).toEqual(98382);
      expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
      expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
      expect(response.results[0].completed).toEqual(true);
    });
  
  // test 11

    test("responds correctly to the mode change command", function() {
      let modeCommand = [new Command("MODE_CHANGE", "LOW_POWER")];
      let message = new Message ("Save energy", modeCommand);
      let roverOne = new Rover(98382);
      let response = roverOne.receiveMessage(message);
      expect(response.results[0].completed).toBe(true);
      expect(roverOne.mode).toEqual("LOW_POWER");
    });
    
    // test 12 

    test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
      let modeMoveCommand = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 98482)];
      let message = new Message("Move 100 yards", modeMoveCommand);
      let roverOne = new Rover(98382);
      expect(roverOne.receiveMessage(message).results[1].completed).toEqual(false);
    }); 

  //  test 13
    
    test("responds with the position for the move command", function() {
      let modeMoveCommand = [new Command("MODE_CHANGE", "NORMAL"), new Command("MOVE", 98482)];
      let roverOne = new Rover(98382);
      let message = new Message ("Move 100 yards", modeMoveCommand);
      let response = roverOne.receiveMessage(message);
      expect(response.results[0].completed).toEqual(true);
      expect(roverOne.position).toEqual(98482); 
    });

});