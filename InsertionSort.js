// sort the array and store each steps into states
// each states is represented by [array, orderIndex, curCompareIndex]
// orderIndex means that the array is sorted from [0, orderIndex)
// curCompareIndex is the array index that is current being compared
function insertionSort(arr, states) {

    states.push([arr.slice(), 0, -1]);
    for (let i = 0; i < arr.length; i++) {
        states.push([arr.slice(), i, i]);

        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            states.push([arr.slice(), i + 1, j - 1]);
        }
    }
    states.push([arr.slice(), arr.length, -1]);
}

// draw the array at the current state
function drawInsert(arr, orderIndex, curIndex) {

    let w = CANVAS_WIDTH / arr.length - 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath();
        if (i < orderIndex) { ctx.fillStyle = RED;  }
        else                { ctx.fillStyle = GRAY; }
        if (i == curIndex)  { ctx.fillStyle = BLUE; }
        ctx.rect(i * (w + 1), CANVAS_HEIGHT - arr[i] - 10,
                 w, arr[i]);
        ctx.fill();
    }
}
