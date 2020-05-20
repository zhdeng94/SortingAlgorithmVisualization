// sort the array and store each steps into states
// each states is represented by [array, orderIndex, curCompareIndex, curMinIndex]
// orderIndex means that the array is sorted from [0, orderIndex)
// curCompareIndex is the array index that is current being compared
// curMinIndex is the index of the minimum among the unsorted portion
function selectionSort(arr, states) {

    states.push([arr.slice(), 0, -1, -1]);
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        states.push([arr.slice(), i, -1, minIndex]);

        for (let j = i + 1; j < arr.length; j++) {
            states.push([arr.slice(), i, j, minIndex]);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                states.push([arr.slice(), i, j, minIndex]);
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        states.push([arr.slice(), i + 1, -1, -1]);
    }
    states.push([arr.slice(), arr.length, -1, -1]);
}

// draw the array at the current state
function drawSelect(arr, orderIndex, curCompareIndex, curMinIndex) {

    let w = CANVAS_WIDTH / arr.length - 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath();
        if (i < orderIndex)       { ctx.fillStyle = RED;  }
        else                      { ctx.fillStyle = GRAY; }
        if (i == curCompareIndex) { ctx.fillStyle = BLUE; }
        if (i == curMinIndex)     { ctx.fillStyle = NAVY; }
        ctx.rect(i * (w + 1), CANVAS_HEIGHT - arr[i] - 10,
                 w, arr[i]);
        ctx.fill();
    }
}
