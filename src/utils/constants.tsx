// filename : constants
// This code defines several enums that represent supported operations, kinds, devices, sensors, and knobs in a home automation system. The code also defines some constants that contain information about which sensors and knobs are supported by each device, and an object called DEVICES that contains information about each device, including the sensors and knobs it supports. Finally, the code exports all of the enums, constants, and DEVICES object.
enum SupportedKind {
    UNARY_OP = "unaryop",
    BINARY_OP = "binaryop",
    PROPERTY = "property",
    BOOLEAN = "boolean",
    NUMBER = "number",
    STRING = "string",
}


enum SupportedOperation {
    // Unary
    NEGATE = "negate",
    NOT = "not",
    // Binary
    // Arithmetic
    PLUS = "plus",
    MINUS = "minus",
    MULTIPLY = "multiply",
    DIVIDE = "divide",
    // Comparison
    LESS_THAN = "lessThan",
    GREATER_THAN = "greaterThan",
    EQUALS = "equals",
    // Logical
    AND = "and",
    OR = "or",
    // Events
    RISES_ABOVE = "risesAbove",
    DROPS_BELOW = "dropsBelow",
    BECOMES = "becomes",
    TOGGLES = "toggles",
}

enum SupportedAction {
    NOTIFY = "notify",
    ACTUATE = "actuate",
}

enum SupportedDevice {
    THERMOSTAT = "thermostat",
    WEATHER_STATION = "weather_station",
    LIVING_ROOM_WINDOW = "living_room_window",
    FRONT_DOOR = "front_door",
    PROXIMITY = "proximity",
    STOVE = "stove",
}

enum SupportedSensor {
    SET_POINT = "set_point",
    TEMPERATURE = "temperature",
    LIGHT_LEVEL = "light_level",
    NUM_PEOPLE_HOME = "num_people_home",
    IS_OFF = "is_off",
    IS_LOCKED = "is_locked",
    IS_CLOSED = "is_closed",
}

enum SupportedKnob {
    RAISE = "raise",
    LOWER = "lower",
    OPEN_BLINDS = "open_blinds",
    CLOSE_BLINDS = "close_blinds",
    LOCK = "lock",
    TURN_OFF = "turn_off",
}

const DEVICE_SENSORS: {[key: string]: SupportedSensor[]} = {
    "thermostat": [SupportedSensor.SET_POINT, SupportedSensor.TEMPERATURE],
    "weather_station": [SupportedSensor.TEMPERATURE, SupportedSensor.LIGHT_LEVEL],
    "living_room_window": [SupportedSensor.LIGHT_LEVEL],
    "front_door": [SupportedSensor.IS_CLOSED, SupportedSensor.IS_LOCKED],
    "proximity": [SupportedSensor.NUM_PEOPLE_HOME],
    "stove": [SupportedSensor.IS_OFF],
}

const DEVICE_KNOBS: {[key: string]: SupportedKnob[]} = {
    "thermostat": [SupportedKnob.RAISE, SupportedKnob.LOWER],
    "weather_station": [],
    "living_room_window": [SupportedKnob.CLOSE_BLINDS, SupportedKnob.OPEN_BLINDS],
    "front_door": [SupportedKnob.LOCK],
    "proximity": [],
    "stove": [SupportedKnob.TURN_OFF],
}

const DEVICES = {
    thermostat: {
        sensors: [
            { 
                name: "set_point",
                type: "signal[number]",
            },
            { 
                name: "temperature",
                type: "signal[number]",
            },
        ],
        knobs: [
            { name: "raise", },
            { name: "lower", },
        ],
    },
    weather_station: {
        sensors: [
            { 
                name: "temperature",
                type: "signal[number]",
            },
            {
                name: "light_level",
                type: "signal[number]",
            },
        ],
        knobs: [],
    },
    living_room_window: {
        sensors: [
        {
            name: "light_level",
            type: "signal[number]",
        }
        ],
        knobs: [
            { name: "open_blinds", },
            { name: "close_blinds", },
        ],
    },
    front_door: {
        sensors: [
            { 
                name: "is_locked",
                type: "signal[boolean]"
            },
            { 
                name: "is_closed",
                type: "signal[boolean]"
            }
        ],
        knobs: [
            { name: "lock", },
        ],
    },
    proximity: {
        sensors: [
        { 
            name: "num_people_home",
            type: "signal[number]"
        }
        ]
    },
    stove: {
        sensors: [
        { 
            name: "is_off",
            type: "signal[boolean]",
        }
        ],
        knobs: [
            { name: "turn_off", },
        ],
    }
}

export {SupportedOperation,
        SupportedKind,
        SupportedDevice,
        SupportedAction,
        SupportedSensor,
        SupportedKnob,
        DEVICES,
        DEVICE_SENSORS,
        DEVICE_KNOBS}