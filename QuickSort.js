// sort the array and store each steps into states
// each states is represented by [array, l, r, curL, curR, curPivot, order]
// array of range [l, r] is currently being sorted.
// curL and curR are two pointers to do 2 way partition.
// curPivot is the pivot during this partion process.
// order is a boolean array indicating the positions that are already sorted.
function quickSort2Way(arr, states) {

    let order = [];
    for (let i = 0; i < arr.length; i++) {
        order.push(false);
    }

    drawQuick2Way(arr, -1, -1, -1, -1, -1, order);
    quickSort2WayHelper(arr, states, 0, arr.length - 1, order);
    drawQuick2Way(arr, -1, -1, -1 ,-1, -1, order);

}

function quickSort2WayHelper(arr, states, l, r, order) {

    if (l > r) { return; }
    if (l === r) {
        order[l] = true;
        states.push([arr.slice(), l, r, -1, -1, -1, order.slice()]);
    }

    states.push([arr.slice(), l, r, -1, -1, -1, order.slice()]);

    let p = partition2Way(arr, states, l, r, order);
    quickSort2WayHelper(arr, states, l, p - 1, order);
    quickSort2WayHelper(arr, states, p + 1, r, order);
}

function partition2Way(arr, states, l, r, order) {

    let p = Math.floor(Math.random() * (r - l + 1)) + l;
    states.push([arr.slice(), l, r, -1, -1, p, order.slice()]);
    let temp = arr[p];
    arr[p] = arr[l];
    arr[l] = temp;

    let v = arr[l];
    states.push([arr.slice(), l, r, -1, -1, l, order.slice()]);

    // arr[l+1...i) <= v; arr(j...r] >= v
    let i = l + 1, j = r;
    states.push([arr.slice(), l, r, i, j, l, order.slice()]);
    while (true) {
        while (i <= r && arr[i] < v) {
            i++;
            states.push([arr.slice(), l, r, i, j, l, order.slice()]);
        }

        while (j >= l + 1 && arr[j] > v) {
            j--;
            states.push([arr.slice(), l, r, i, j, l, order.slice()]);
        }

        if (i > j) { break; }

        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
        states.push([arr.slice(), l, r, i, j, l, order.slice()]);
    }

    temp = arr[l];
    arr[l] = arr[j];
    arr[j] = temp;
    order[j] = true;
    states.push([arr.slice(), l, r, -1, -1, -1, order.slice()]);

    return j;
}

// draw the array at the current state
function drawQuick2Way(arr, l, r, curL, curR, curPivot, order) {

    let w = CANVAS_WIDTH / arr.length - 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < arr.length; i++) {
        ctx.beginPath();
        if (l <= i && i <= r)          { ctx.fillStyle = GREEN; }
        else                           { ctx.fillStyle = GRAY;  }
        if (i === curPivot)            { ctx.fillStyle = NAVY;  }
        if (l + 1 <= i && i <= curL)   { ctx.fillStyle = BLUE;  }
        if (curR <= i && i <= r)       { ctx.fillStyle = BLUE;  }
        if (order[i])                  { ctx.fillStyle = RED;   }
        ctx.rect(i * (w + 1), CANVAS_HEIGHT - arr[i] - 10,
                 w, arr[i]);
        ctx.fill();
    }
}
