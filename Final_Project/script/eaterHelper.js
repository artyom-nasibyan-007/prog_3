class EaterHelper {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.energy = 60;
            this.bombCount = 0;
    
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }
    
        getNewCoordinates() {
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }
    
        chooseCell(char) {
            let found = [];
            for (let i = 0; i < this.directions.length; i++) {
                this.getNewCoordinates();
                let
                    x = this.directions[i][0],
                    y = this.directions[i][1];
    
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    
                    if (matrix[y][x] == char) {
                        found.push(this.directions[i]);
                    }
    
                }
            }
    
            return found;
        }
    
        move() {
            this.energy--;
            this.bombCount++;
            var
                emptyCells = this.chooseCell(0),
                newCell = random(emptyCells),
                grassCells = this.chooseCell(1),
                newGrass = random(grassCells),
                holeCells = this.chooseCell(6),
                newHole = random(holeCells);
    
    
                if (newHole && this.energy >= 0) {

                    matrix[this.y][this.x] = 0;
                        for (var i in planterArr) {
                            if (this.x == planterArr[i].x && this.x == planterArr[i].y) {
                                planterArr.splice(i, 1);
                                break;
                            }
                        }
            
                } 
            else if (newCell && this.energy > 0) {
                    if(this.bombCount % 10 != 0) {

                    var newX = newCell[0];
                    var newY = newCell[1];
                    matrix[newY][newX] = 7;
                    matrix[this.y][this.x] = 0;
                    this.x = newX;
                    this.y = newY;
                    }

                    else if(this.bombCount % 10 == 0) {
                        var newX = newCell[0];
                        var newY = newCell[1];
                        matrix[newY][newX] = 7;
                        matrix[this.y][this.x] = 8;
                        let bombObj = new HelperBomb(this.x,this.y);
                        bombObj.add();
                        this.x = newX;
                        this.y = newY;
                    }
            }
    
            else if(newGrass && this.energy > 0) {
                if(this.bombCount % 10 != 0) {
                    var newX = newGrass[0];
                    var newY = newGrass[1];
                    matrix[newY][newX] = 7;
                    matrix[this.y][this.x] = 0;
                    this.x = newX;
                    this.y = newY;
                }
                else if(this.bombCount % 10 == 0) {
                    var newX = newGrass[0];
                    var newY = newGrass[1];
                    matrix[newY][newX] = 7;
                    matrix[this.y][this.x] = 8;
                    let bombObj = new HelperBomb(this.x,this.y);
                    bombObj.add();
                    this.x = newX;
                    this.y = newY;
                }
            }
    
            else {
                this.die();
            }
        }
    
        die() {
            matrix[this.y][this.x] = 0;
            for (let i in eaterHelperArr) {
                if (this.x == eaterHelperArr[i].x && this.y == eaterHelperArr[i].y) {
                    eaterHelperArr.splice(i, 1);
                    break;
                }
            }
        }
}