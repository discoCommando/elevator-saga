// const dupa = {
//   init: function(elevators, floors) {
//     let id = 1;
//     let floorMap = {};
//     floors.forEach((f) => {
//       floorMap[id] = {
//         waiting: 0,
//       };
//       id++;
//     });
//     id = 1;
//     let elevatorMap = {};
//     elevators.forEach(() => {
//       elevatorMap[id] = {
//         going: false,
//       };
//       id++;
//     });
//     elevators.forEach((elevator) => {
//       // Whenever the elevator is idle (has no more queued destinations) ...
//       elevator.on("idle", function() {
//         // let's go to all the floors (or did we forget one?)
//         let id = 1;
//         let max = 0;
System.register("main", [], function (exports_1, context_1) {
    "use strict";
    var elevatorSaga;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // const dupa = {
            //   init: function(elevators, floors) {
            //     let id = 1;
            //     let floorMap = {};
            //     floors.forEach((f) => {
            //       floorMap[id] = {
            //         waiting: 0,
            //       };
            //       id++;
            //     });
            //     id = 1;
            //     let elevatorMap = {};
            //     elevators.forEach(() => {
            //       elevatorMap[id] = {
            //         going: false,
            //       };
            //       id++;
            //     });
            //     elevators.forEach((elevator) => {
            //       // Whenever the elevator is idle (has no more queued destinations) ...
            //       elevator.on("idle", function() {
            //         // let's go to all the floors (or did we forget one?)
            //         let id = 1;
            //         let max = 0;
            //         floors.forEach(() => {
            //           const waiting = floorMap[id].waiting;
            //           if (waiting > floorMap[max].waiting) {
            //             max = id;
            //           }
            //           id++;
            //         });
            //         elevator.goToFloor(max);
            //       });
            //       elevator.on("floor_button_pressed", function(floorNum) {
            //         // let's go to all the floors (or did we forget one?)
            //         elevator.goToFloor(floorNum);
            //       });
            //       elevator.on("stopped_at_floor", function(floorNum) {
            //         floorMap[floorNum].waiting = 0;
            //       });
            //     }); // Let's use the first elevator
            //     floors.forEach((floor) => {
            //       floor.on("up_button_pressed", function() {
            //         floorMap[floor.floorNum()].waiting++;
            //       });
            //     });
            //   },
            //   update: function(dt, elevators, floors) {
            //     // We normally don't need to do anything here
            //   },
            // };
            exports_1("elevatorSaga", elevatorSaga = {
                init: function (elevators, floors) {
                    // const dupa = 1;
                    // let id = 1;
                    // let floorMap = {};
                    // id = 1;
                    // let elevatorMap = {};
                    // elevators.forEach(() => {
                    //   elevatorMap[id] = {
                    //     going: false,
                    //   };
                    //   id++;
                    // });
                    //
                    var FLOOR_START = 0;
                    var id = FLOOR_START;
                    var floorMap = {};
                    floors.forEach(function (_f) {
                        floorMap[id] = {
                            waiting: 0
                        };
                        id++;
                    });
                    var elevatorMap;
                    elevators.forEach(function (elevator) {
                        elevator.on("idle", function () {
                            // let's go to all the floors (or did we forget one?)
                            var id = FLOOR_START;
                            var max = FLOOR_START;
                            floors.forEach(function () {
                                var waiting = floorMap[id].waiting;
                                if (waiting > floorMap[max].waiting) {
                                    max = id;
                                }
                                id++;
                            });
                            elevator.goToFloor(max);
                        });
                        elevator.on("floor_button_pressed", function (floorNum) {
                            // let's go to all the floors (or did we forget one?)
                            elevator.goToFloor(floorNum);
                        });
                        elevator.on("stopped_at_floor", function (floorNum) {
                            floorMap[floorNum].waiting = 0;
                        });
                    }); // Let's use the first elevator
                    floors.forEach(function (floor) {
                        floor.on("up_button_pressed", function () {
                            console.log("flfl", floor.floorNum());
                            floorMap[floor.floorNum()].waiting++;
                        });
                        floor.on("down_button_pressed", function () {
                            console.log("flfl", floor.floorNum());
                            floorMap[floor.floorNum()].waiting++;
                        });
                    });
                },
                update: function (dt, elevators, floors) {
                    // We normally don't need to do anything here
                }
            });
        }
    };
});
