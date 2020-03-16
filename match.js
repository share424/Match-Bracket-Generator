// Match class
function Match(level, position) {
    this.level = level;
    this.position = position;
    this.width = 200;
    this.playerRed = null;
    this.playerBlue = null;
    this.order = null;

    this.levelOrder = function() {
        let totalPosition = Math.pow(2, this.level);
        return this.level*totalPosition + (totalPosition - this.position - 1);
    }

    this.draw = function(canvas) {
        if(this.position > Math.pow(2, this.level) - 1) {
            return;
        }

        let x = canvas.width - (this.level * this.width) - 5;
        let h = canvas.height * (1 / Math.pow(2, 2 + this.level));
        let y = (4 * this.position + 2) * h;
        canvas.stroke(0);
        canvas.line(x, y - h, x, y + h);

        // player Red
        canvas.stroke(255, 0, 0);
        canvas.line(x, y - h, x - this.width, y - h);
        if(this.playerRed) {
            canvas.text(this.playerRed.name, x - this.width, y - h);
        }
        
        // player Blue
        canvas.stroke(0, 0, 255);
        canvas.line(x, y + h, x - this.width, y + h);
        if(this.playerBlue) {
            canvas.text(this.playerBlue.name, x - this.width, y + h);
        }

        // draw match order
        if(this.order)
            canvas.text(this.order, x, y);
        canvas.text(this.levelOrder(), x-50, y);
        
    }

    this.draw2 = function(paper) {
        if(this.position > Math.pow(2, this.level) - 1) {
            return;
        }
        let x = paper.width - (this.level * (this.width + 15)) - 15;
        let h = paper.height * (1 / Math.pow(2, 2 + this.level));
        let y = (4 * this.position + 2) * h;

        // player red
        // background
        paper.rect(x - this.width, y - h - 25, this.width, 50, 3).attr({fill: "#F6511D"});
        // line divider
        paper.rect(x - this.width, y - h, this.width, 1).attr({stroke: "#444549"});
        if(this.playerRed) {
            paper.text(x - this.width + 20, y - h - 12.5, this.playerRed.name).attr({fill: "#fff", "font-size": 12, "text-anchor": "start"});
            paper.text(x - this.width + 20, y - h + 12.5, this.playerRed.contingent).attr({fill: "#fff", "font-size": 12, "text-anchor": "start"});    
        }

        // player blue
        paper.rect(x - this.width, y + h - 25, this.width, 50, 3).attr({fill: "#00A6ED"});
        paper.rect(x - this.width, y + h, this.width, 1).attr({stroke: "#444549"});
        if(this.playerBlue) {
            paper.text(x - this.width + 20, y + h - 12.5, this.playerBlue.name).attr({fill: "#fff", "font-size": 12, "text-anchor": "start"});
            paper.text(x - this.width + 20, y + h + 12.5, this.playerBlue.contingent).attr({fill: "#fff", "font-size": 12, "text-anchor": "start"});    
        }

        // order
        paper.text(x + 1, y, this.levelOrder()).attr({fill: "#000", "font-size": 12, "text-anchor": "start"});

        // matching line
        paper.path("M" + (x + 5) + "," + (y - h) + "L" + (x + 10) + "," + (y - h) + "L" + (x + 10) + "," + (y + h) + "L"  + (x + 5) + "," + (y + h)).attr({"stroke-width": 2});
    }

}