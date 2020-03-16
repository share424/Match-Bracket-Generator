var paper;
function generate(n) {
    var bracket = new Bracket(n);
    bracket.createMatch(false);
    let total = Math.pow(2, bracket.totalFixLevel() + 1);
    let predictedHeight = total * (50 + 5);
    let predictedWidth = (bracket.totalFixLevel() + 1) * (200 + 15 + 3);
    if(paper) paper.clear();
    paper = Raphael(10, 25, predictedWidth, predictedHeight);
    var players = [];
    for(let i = 0; i<=n+1; i++) {
        players.push(new Player("Player "+i, "Contingent "+i));
    }
    bracket.seedPlayers(players);
    bracket.draw2(paper);
    // console.log({width: predictedWidth, height: predictedHeight});
    return paper;
}