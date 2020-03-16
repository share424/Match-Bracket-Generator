function Bracket(num) {
    this.isBye = (Math.log2(num) - 1) % 1 > 0;
    this.totalLevel = Math.floor(Math.log2(num) - 1);
    this.totalOrder = num - 1;
    this.matches = [];
    this.totalPlayer = num;

    this.totalFixLevel = function() {
        return this.totalLevel + (this.isBye ? 1 : 0);
    }

    this.createMatch = function(verbose=true) {
        // create normal bracket without bye
        var order = this.totalOrder;
        for(var i = 0; i<=this.totalLevel; i++) {
            let totalMatch = Math.pow(2, i); // total match in a level
            for(var j = totalMatch-1; j>=0; j--) {
                var match = new Match(i, j);
                match.order = order--; // set the match order
                this.matches.push(match);
            }
        }

        // if bye, then let's create it
        if(this.isBye) {
            let total = Math.pow(2, this.totalLevel + 1); // total match in last level
            let totalBye = this.totalPlayer - total; // total bye in last level
            
            let centerPosition = total/2; // the center position

            // initialze starting position for each leaf (left and right)
            let startLeft = 0;
            let startRight = centerPosition;
            // initialize the difference position each match
            let difference = total/4;

            // initliaze current position and level
            let currentLeft = startLeft;
            let currentRight = startRight;
            let currentLevel = this.totalLevel + 1;

            // initialize flag
            let leftFlag = true;
            let rightFlag = true;
            let isFlipped = false;

            // initialize factor
            let factor = difference - 2;

            if(verbose) console.log({total: total, bye: totalBye, factor: factor, center: centerPosition, diff: difference});
            
            
            for(var x = 0; x<totalBye; x++) {
                // if current i is grater than center, write the second half bye
                if(x >= centerPosition && !isFlipped) {
                    leftFlag = true;
                    rightFlag = true;
                    currentLeft = startLeft;
                    currentRight = startRight;
                    isFlipped = true;
                    if(verbose) console.log('Flip');
                }
                var i = x;
                if(isFlipped) {
                    i = x - centerPosition;
                }
                // split even and odd index
                // even for left bracket, odd for right bracket
                if(i % 2 == 0) { // left bracket
                    // create match and add to matches list
                    
                    if(currentLeft >= centerPosition) {
                        if(i >= (difference - 1) && leftFlag) {
                            leftFlag = false;
                        }
                        if(leftFlag) {
                            if(i % 4 != 0) {
                                currentLeft = i + factor;
                            } else {
                                currentLeft = i;
                            }
                        } else {
                            if(i % 4 == 0) {
                                currentLeft = i - factor;
                                
                            } else {
                                currentLeft = i;
                            }
                        }
                    }
                    if(verbose) console.log({i: i, left: currentLeft, leftFlag: leftFlag});
                    var match = new Match(currentLevel, centerPosition - (currentLeft + (isFlipped ? 1 : 0)) - 1);
                    this.matches.push(match);
                    currentLeft += difference; // increase the current position by difference
                    
                } else { // right bracket
                    
                    if(currentRight >= total) {
                        let halfDifference = difference / 2;
                        var right_i = i - 1;
                        if((i-1) >= (difference - 1) && rightFlag) {
                            rightFlag = false;
                        }
                        if(rightFlag) {
                            if(right_i % 4 != 0) {
                                currentRight = right_i + factor + startRight;
                            } else {
                                currentRight = right_i + startRight;
                            }
                        } else {
                            if(right_i % 4 == 0) {
                                
                                currentRight = right_i - factor + startRight;
                            } else {
                                currentRight = right_i + startRight;
                            }
                        }
                    }
                    if(verbose) console.log({i: i, right: currentRight, rightFlag: rightFlag});
                    var match = new Match(currentLevel, currentRight + (isFlipped ? 1 : 0));
                    this.matches.push(match);
                    currentRight += difference;
                }
            }
        }
        this.matches.sort(this.compare_level_order).reverse();
        // this.matches.forEach(match => console.log(match.levelOrder()))
    }

    this.hasMatch = function(level, position) {
        for(let i = 0; i<this.matches.length; i++) {
            if(this.matches[i].level == level && this.matches[i].position == position) {
                return true;
            }
        }
        return false;
    }

    this.seedPlayers = function(players) {
        if(players.length != this.totalPlayer) {
            return;
        }
        let j = 0
        for(let i = 0; i<this.matches.length; i++) {
            let currentLevel = this.matches[i].level;
            var child1Pos = null;
            var child2Pos = null;
            if(currentLevel < this.totalFixLevel()) {
                // locate the children position
                child1Pos = this.matches[i].position * 2;
                child2Pos = child1Pos + 1;
            }
            if(child1Pos == null || !this.hasMatch(currentLevel + 1, child1Pos)) {
                this.matches[i].playerRed = players[j++];
            }
            
            if(j >= players.length) {
                break;
            }
            if(child2Pos == null  || !this.hasMatch(currentLevel + 1, child2Pos)) {
                this.matches[i].playerBlue = players[j++];
            }
            
            if(j >= players.length) {
                break;
            }
        }

    }

    this.setPlayers = function(players) {
        
    }

    this.compare_level_order = function(a, b) {
        if(a.levelOrder() < b.levelOrder()) return -1;
        if(a.levelOrder() > b.levelOrder()) return 1;
        return 0;
    }

    this.compare_position = function(a, b) {
        if(a.position < b.position) {
            return -1;
        }
        if(a.position > b.position) {
            return 1;
        }
        return 0;
    }

    this.draw = function(canvas) {
        this.matches.forEach(match => match.draw(canvas));
    }

    this.draw2 = function(paper) {
        paper.clear();
        this.matches.forEach(match => match.draw2(paper));
    }
}