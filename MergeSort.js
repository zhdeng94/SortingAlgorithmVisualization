// sort the array and store each steps into states
// each states is represented by [array, left, right, mergeIndex]
// array of range [left, right] is currently being merge sort.
// mergeIndex indicates the index currently being merged.
function mergeSort(arr, states) {

    states.push([arr.slice(), -1, -1, -1]);
    let temp = []; // temporary array for merge step
    for (let i = 0; i < arr.length; i++) {
        temp.push(0);
    }
    mergeSortHelper(arr, 0, arr.length - 1, temp, states);

    states.push([arr.slice(), 0, arr.length - 1, arr.length - 1]);
}

// helper function to do merge sort recursively
function mergeSortHelper(arr, start, end, temp, states) {

    if (start >= end) { return; }
    let mid = Math.floor((start + end) / 2);

    states.push([arr.slice(), start, end, -1]);
    mergeSortHelper(arr, start, mid, temp, states);
    mergeSortHelper(arr, mid + 1, end, temp, states);
    merge(arr, start, end, temp, states);
}

// function to merge two sorted array
function merge(arr, start, end, temp, states) {

    let middle = Math.floor((start + end) / 2);
    let leftIndex = start;
    let rightIndex = middle + 1;
    let tempIndex = start;

    while (leftIndex <= middle && rightIndex <= end) {
        if (arr[leftIndex] <= (arr[rightIndex])) {
            temp[tempIndex++] = arr[leftIndex++];
        } else {
            temp[tempIndex++] = arr[rightIndex++];
        }
    }

    while (leftIndex <= middle) {
        temp[tempIndex++] = arr[leftIndex++];
    }

    while (rightIndex <= end) {
        temp[tempIndex++] = arr[rightIndex++];
    }

    for (let i = start; i <= end; i++) {
        arr[i] = temp[i];
        states.push([arr.slice(), start, end, i]);
    }
}

// draw the array at the current state
function drawMerge(arr, l, r, mergeIndex) {

    let w = CANVAS_WIDTH / arr.length - 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath();
        if (l <= i && i <= r)          { ctx.fillStyle = GREEN; }
        else                           { ctx.fillStyle = GRAY; }
        if (l <= i && i <= mergeIndex) { ctx.fillStyle = RED; }
        ctx.rect(i * (w + 1), CANVAS_HEIGHT - arr[i] - 10,
                 w, arr[i]);
        ctx.fill();
    }
}
