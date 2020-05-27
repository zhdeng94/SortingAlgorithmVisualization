const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const RED = "#FF4136";
const BLUE = "#0074D9"
const NAVY = "#001f3f";
const GRAY = "#AAAAAA";
const GREEN = "#2ECC40";

// Initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");

// slider for controlling the speed of the animation
const speedControl = document.getElementById("Speed");

let speed = speedControl.value;
speedControl.oninput = function() {
    speed = 120 - speedControl.value;
}

// variables used to store the state of each animation frame
let states = [];
let timer = [];

// slider for controlling the length of the array
const lengthControl = document.getElementById("Length");

let length = lengthControl.value;
lengthControl.oninput = function() {
    length = lengthControl.value;
}

// create an random array with size of n
function createArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (CANVAS_HEIGHT - 25)) + 10);
    }
    return arr;
}

// stop the animation at this moment
function stop() {
    timer.forEach((sto) => {
        clearTimeout(sto);
    });
}

// selection sort animation
function startSelectionSort() {

    // clear previous animation
    timer.forEach((sto) => {
        clearTimeout(sto);
    });

    // clear the states
    states = [];

    // run the SelectionSort
    let arr = createArray(length);
    selectionSort(arr, states);

    // show the animation
    for (let i = 0; i < states.length; i++) {
        timer.push(setTimeout(drawSelect, speed * i, states[i][0], states[i][1], states[i][2], states[i][3]));
    }
}

// insertion sort animation
function startInsertionSort() {

    // clear previous animation
    timer.forEach((sto) => {
        clearTimeout(sto);
    });

    // clear the states
    states = [];

    // run the InsertionSort
    let arr = createArray(length);
    insertionSort(arr, states);

    // show the animation
    for (let i = 0; i < states.length; i++) {
        timer.push(setTimeout(drawInsert, speed * i, states[i][0], states[i][1], states[i][2]));
    }
}

// merge sort animation
function startMergeSort() {

    // clear previous animation
    timer.forEach((sto) => {
        clearTimeout(sto);
    });

    // clear the states
    states = [];

    // run the MergeSort
    let arr = createArray(length);
    mergeSort(arr, states);

    // show the animation
    for (let i = 0; i < states.length; i++) {
        timer.push(setTimeout(drawMerge, speed * i, states[i][0], states[i][1], states[i][2], states[i][3]));
    }
}

// 2-way quick sort animation
function startQuickSort2Way() {

    // clear previous animation
    timer.forEach((sto) => {
        clearTimeout(sto);
    });

    // clear the states
    states = [];

    // run the 2-way quick sort
    let arr = createArray(length);
    quickSort2Way(arr, states);

    // show the animation
    for (let i = 0; i < states.length; i++) {
        timer.push(setTimeout(drawQuick2Way, speed * i, states[i][0], states[i][1], states[i][2],
            states[i][3], states[i][4], states[i][5], states[i][6]));
    }
}

// heap sort animation
function startHeapSort() {

    // clear previous animation
    timer.forEach((sto) => {
        clearTimeout(sto);
    });

    // clear the states
    states = [];

    // run heap sort
    let arr = createArray(length);
    heapSort(arr, states);

    // show the animation
    for (let i = 0; i < states.length; i++) {
        timer.push(setTimeout(drawHeap, speed * i, states[i][0], states[i][1]));
    }
}
