// filname : Tasks.tsx
// This code defines an Automated Window Blinds task in the form of an Abstract Syntax Tree (AST) using TypeScript. It includes conditions for when the temperature rises above a certain level and the light level is greater than 40, and an action to close the blinds in the living room window. The AST is then exported as a named object.
import {Task} from '../AST';

const AutomateWindowBlindsAST: Task = {
    kind: "task",
    when: {
        kind: "binaryop",
        operator: "risesAbove",
        lhs: {
            kind: "property",
            device: "weather_station",
            sensor: "temperature",
        },
        rhs: {
            kind: "property",
            device: "thermostat",
            sensor: "temperature",
        },
    },
    if: {
        kind: "binaryop",
        operator: "greaterThan",
        lhs: {
            kind: "property",
            device: "living_room_window",
            sensor: "light_level",
        },
        rhs: {
            kind: "number",
            value: 40,
        },
    },
    action: {
        kind: "actuate",
        device: "living_room_window",
        knob: "close_blinds",
    },
};

export {AutomateWindowBlindsAST}

