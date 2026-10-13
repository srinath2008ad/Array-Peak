function square(a,b){
    return a ** b
}

function Distance(x1, y1, x2, y2) {
    return square( (square((x2 - x1),2) + square((y2-y1),2) ) , 0.5);
}