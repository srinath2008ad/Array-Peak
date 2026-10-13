const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}


function findHighestPeak(array) {
    let highest = 0;

    for (const element in array) {
        highest = Math.max(highest, array[element])
    }

    return highest
}

function highestPeakHeight(height) {
    return height * 90 / 100;
}

function getCoordinates(number, chart, scalingValue, height, index) {
    const pointHeight = scalingValue * number

    return {
        x: chart.gap * index,
        y: height - pointHeight
    }
}

function findPeaks(array) {
    const peakValues = []

    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[i - 1] && array[i] > array[i + 1]) {
            peakValues.push(array[i])
        }
    }

    return peakValues
}

function setup() {

    const window = {
        WIDTH: 600,
        HEIGHT: 400,
        FPS: 60
    }

    const chart = {
        gap: 20
    }

    // const data = [34, 56]
    const data = [34, 56, 32, 11, 56, 8, 2, 9, 31, 12, 91, 101, 78]

    const highestPeak = findHighestPeak(data)

    const peakHeight = highestPeakHeight(window.HEIGHT)

    const scalingValue = peakHeight / highestPeak;

    const peakValues = findPeaks(data)

    r.InitWindow(window.WIDTH, window.HEIGHT, "PEAK")
    r.SetTargetFPS(window.FPS)

    return { window, data, scalingValue, chart, peakValues }
}

function update() {
    // change the state
}


function draw(world) {
    r.BeginDrawing();

    r.ClearBackground(r.RAYWHITE)

    for (let i = 0; i < world.data.length - 1; i++) {

        const vector1 = getCoordinates(world.data[i], world.chart, world.scalingValue, world.window.HEIGHT, i)
        const vector2 = getCoordinates(world.data[i + 1], world.chart, world.scalingValue, world.window.HEIGHT, i + 1)

        drawPoint(world, i, vector1);

        r.DrawLineV(vector1, vector2, r.BLACK)
    }

    r.EndDrawing();
}

function drawPoint(world, i, vector1) {
    if (isIncluded(world.data, world.data[i])) {
        r.DrawCircleV(vector1, 5, r.RED);
    }
}

function isIncluded(array, element) {
    for (const number of array) {
        if (number === element) {
            return true
        }
    }

    return false
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};