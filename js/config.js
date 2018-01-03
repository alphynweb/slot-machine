
// CREDITS

const CREDITS = 20;

// REEL ITEMS //

// Number of items to render on screen
const NO_RENDER_ITEMS = 4;

// Height of reel items
const ITEM_HEIGHT = 100;

// Width of reel items
const ITEM_WIDTH = 100;

// REELS //

// Reel Item Lists
const REEL_ITEM_LISTS = [];

// Define reels array - two dimensional array which is going to hold each reel as an array of objects (fruit)
const REELS = [];

// Number of reels
const NO_REELS = 3;

// Spacing between reels
const REEL_SPACING = 50;

// Width of reel
const REEL_WIDTH = ITEM_WIDTH;

// Total width of reels
const REELS_TOTAL_WIDTH = (NO_REELS * REEL_WIDTH) + ((NO_REELS -1) * REEL_SPACING);

// Reel speed
const REEL_SPEED = 20;

// Reel container padding
const REEL_CONTAINER_PADDING = 20;

// VIEWPORT //

// Viewport container padding
const VIEWPORT_CONTAINER_PADDING_X = 20;

const VIEWPORT_CONTAINER_PADDING_Y = REEL_CONTAINER_PADDING;

// Viewport height - item heights + padding
const VIEWPORT_HEIGHT = ITEM_HEIGHT * 3;

// Viewport width - Total items width plus padding
const VIEWPORT_WIDTH = REELS_TOTAL_WIDTH;

// Viewport bottom left x coordinate
const VIEWPORT_X = (VIEWPORT_WIDTH / 2) - (REELS_TOTAL_WIDTH / 2);

// Viewport bottom left Y coordinate
const VIEWPORT_Y = 0;

// Assign variable to nudge speed
const NUDGE_SPEED = 5; // Must multilply into item height

// Assign variable to spin result
const SPIN_RESULT = [];

// Line result
const LINE_RESULT = [];

// Element which displays number of credits
const CREDITS_CONTAINER = document.getElementById('credits');

// Nudges left for player
const NUDGES_LEFT = 0;

// Can hold
const CAN_HOLD = false;

// Buttons

BUTTON_WIDTH = REEL_WIDTH;


// IMAGES //

const ITEM_LIST = [];

const ITEM_INFO = [
    {
        type: "Cherry",
        imageSrc: "cherry.jpg",
        instances: 5,
        winAmount: 50
    },
    {
        type: "Bell",
        imageSrc: "bell.jpg",
        instances: 3,
        winAmount: 150
    },
    {
        type: "Plum",
        imageSrc: "plum.jpg",
        instances: 4,
        winAmount: 100
    },
    {
        type: "Bar",
        imageSrc: "bar.jpg",
        instances: 2,
        winAmount: 200
    },
    {
        type: "Grape",
        imageSrc: "grape.jpg",
        instances: 4,
        winAmount: 100
    },
    {
        type: "Lime",
        imageSrc: "lime.jpg",
        instances: 4,
        winAmount: 100
    },
    {
        type: "Orange",
        imageSrc: "orange.jpg",
        instances: 4,
        winAmount: 100
    },
    {
        type: "Seven",
        imageSrc: "seven.jpg",
        instances: 1,
        winAmount: 500
    },
    {
        type: "Melon",
        imageSrc: "melon.jpg",
        instances: 3,
        winAmount: 150
    }
];

//Define number of items on reels - Add up all the required amount of items according to instances values of each individual item
let NO_ITEMS;

ITEM_INFO.forEach(function (item, index) {
    // Add number of instances of item to total no of items on reel
    NO_ITEMS += item.instances;
});