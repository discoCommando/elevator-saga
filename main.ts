
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

export const elevatorSaga = {
  init: function(elevators: Elevator[], floors: Floor[]) {
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
    const FLOOR_START = 0;
    let id = FLOOR_START;
    const floorMap: Record<number, { waiting: number }> = {};
    floors.forEach((_f) => {
      floorMap[id] = {
        waiting: 0,
      };
      id++;
    });
    const elevatorMap: Record<number, { floorsToStop: number[] }>
    elevators.forEach((elevator) => {
      elevator.on("idle", function() {
        // let's go to all the floors (or did we forget one?)
        let id = FLOOR_START;
        let max = FLOOR_START;

        floors.forEach(() => {
          const waiting = floorMap[id].waiting;
          if (waiting > floorMap[max].waiting) {
            max = id;
          }
          id++;
        });
        elevator.goToFloor(max);
      });
      elevator.on("floor_button_pressed", function(floorNum) {
        // let's go to all the floors (or did we forget one?)
        elevator.goToFloor(floorNum);
      });
      elevator.on("stopped_at_floor", function(floorNum) {
        floorMap[floorNum].waiting = 0;
      });
    }); // Let's use the first elevator

    floors.forEach((floor) => {
      floor.on("up_button_pressed", function() {
        console.log("flfl", floor.floorNum())
        floorMap[floor.floorNum()].waiting++;
      });

      floor.on("down_button_pressed", function() {
        console.log("flfl", floor.floorNum())
        floorMap[floor.floorNum()].waiting++;
      });
    });
  },
  update: function(_dt: any, _elevators: any, _floors: any) {
    // We normally don't need to do anything here
  },

}

type ElevatorEvent =
  {
    "idle": () => void,
    "floor_button_pressed": (floorNum: number) => void,
    "passing_floor": (floorNum: number, direction: "up" | "down") => void,
    "stopped_at_floor": (floorNum: number) => void,
  }


type ElevatorOn = <K extends keyof ElevatorEvent>(event: K, callback: ElevatorEvent[K]) => void

interface Elevator {
  /** Queue the elevator to go to specified floor number. If you specify true as second argument, the elevator will go to that floor directly, and then go to any other queued floors.*/
  goToFloor: (floor: number, directly?: boolean) => void;
  /** Clear the destination queue and stop the elevator if it is moving. Note that you normally don't need to stop elevators - it is intended for advanced solutions with in-transit rescheduling logic. Also, note that the elevator will probably not stop at a floor, so passengers will not get out.*/
  stop: () => void;
  /** Gets the floor number that the elevator currently is on.*/
  currentFloor: () => number;
  /** Gets or sets the going up indicator, which will affect passenger behaviour when stopping at floors.*/
  goingUpIndicator: (set?: boolean) => void;
  /** Gets or sets the going down indicator, which will affect passenger behaviour when stopping at floors.*/
  goingDownIndicator: (set?: boolean) => void;
  /** Gets the maximum number of passengers that can occupy the elevator at the same time.*/
  maxPassengerCount: () => number;
  /** Gets the load factor of the elevator. 0 means empty, 1 means full. Varies with passenger weights, which vary - not an exact measure.*/
  loadFactor: () => number;
  /** Gets the direction the elevator is currently going to move toward. Can be "up", "down" or "stopped".*/
  destinationDirection: () => string;
  /** The current destination queue, meaning the floor numbers the elevator is scheduled to go to. Can be modified and emptied if desired. Note that you need to call checkDestinationQueue() for the change to take effect immediately.*/
  destinationQueue: number[];
  /** Checks the destination queue for any new destinations to go to. Note that you only need to call this if you modify the destination queue explicitly.*/
  checkDestinationQueue: () => void;
  /** Gets the currently pressed floor numbers as an array.*/
  getPressedFloors: () => number[];
  /** Listen for events ("idle", "stopped_at_floor", "passing_floor", "floor_button_pressed")*/
  on: ElevatorOn;
}


interface Floor {
  /** Gets the floor number of the floor object.*/
  floorNum: () => number;
  /** Listen for events ("up_button_pressed", "down_button_pressed")*/
  on: (events: `${"down" | "up"}_button_pressed`, cb: () => void) => void;
  /** State of the up and down button at a floor. "activated" or "" */
  buttonStates: { down: string, up: string };
}
