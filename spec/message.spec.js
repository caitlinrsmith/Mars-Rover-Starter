const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
// test 4

test("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect(function() {new Message();}).toThrow(new Error("Message name required"));
  });

// test 5

test("constructor sets name", function() {
    let msg = new Message("msgName");
    expect(msg.name).toEqual("msgName");
});

// // test 6

test("contains a commands array passed into the constructor as the 2nd argument", function() {
  let msgCommands = ["left", "right", "diagonally"];
  let msg = new Message("msgName", msgCommands);
  expect(msg.commands).toEqual(msgCommands);
});

});