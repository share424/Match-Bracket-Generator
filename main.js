var canvas;
// initialize
setup = () => {
    canvas = createCanvas(600, 800);
    
}


// drawing function
draw = () => {
    
}

function generate(n) {
    clear();
    let bracket = new Bracket(n);
    bracket.createMatch(false);
    bracket.draw(canvas);
}

function test(n) {
    let bracket = new Bracket(n);
    var byes = [];
    var totalPosition = Math.pow(2, bracket.totalLevel + 1);
    var totalBye = bracket.totalPlayer - totalPosition;
    for(var i = 0; i<totalPosition; i++) {
        byes.push(i);
    }
    bracket.createBye(byes);
}

