// sort the array and store each steps into states
// each states is represented by [array, heapIndex]
// array of range [heapIndex, array.length) is already sorted.
function heapSort(arr, states) {

    states.push([arr.slice(), arr.length]);

    // build max heap
    for (let i = (arr.length - 1 - 1) / 2; i >= 0; i--) {
        siftDown(arr, states, arr.length, i, arr.length);
    }

    // heap sort
    for(let i = arr.length - 1; i > 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        siftDown(arr, states, i, 0, i + 1);
        states.push([arr.slice(), i]);
    }

    states.push([arr.slice(), 0]);
}

function siftDown(arr, states, n, k, heapIndex){

    while (2 * k + 1 < n) {
        let j = 2 * k + 1;
        if (j + 1 < n && arr[j + 1] > arr[j]) {
            j += 1;
        }

        if (arr[k] >= arr[j]) {
            break;
        }

        let temp = arr[k];
        arr[k] = arr[j];
        arr[j] = temp;
        states.push([arr.slice(), heapIndex]);
        k = j;
    }
}

// draw the array at the current state
function drawHeap(arr, heapIndex) {

    let w = CANVAS_WIDTH / arr.length - 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath();
        if (i >= heapIndex)  { ctx.fillStyle = RED; }
        else                 { ctx.fillStyle = GRAY; }
        ctx.rect(i * (w + 1), CANVAS_HEIGHT - arr[i] - 10,
                 w, arr[i]);
        ctx.fill();
    }
}
