class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;

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
        this.getNewCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
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

    mul() {
        let
            found = this.chooseCell(0),
            foundRand = random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2;
            let eater = new GrassEater(x, y);
            eaterArr.push(eater);
            this.energy = 8;
        }
    }

    move() {
        this.energy--;
        var
            emptyCells = this.chooseCell(0),
            newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

        else {
            this.die();
        }
    }

    eat() {
        var
            emptyCells = this.chooseCell(1),
            newCell = random(emptyCells),
            holeCells = this.chooseCell(6),
            newHole = random(holeCells);

            if (newHole && this.energy >= 0) {
                matrix[this.y][this.x] = 0;
                for (var i in eaterArr) {
                    if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                        eaterArr.splice(i, 1);
                        break;
                    }
                }
        
            }    
        else if (newCell) {
            this.energy+=2;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 3);
                    break;
                }
            }

            if (this.energy >= 16) {
                this.mul();
            }

        }

        else {
            this.move();
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1);
                break;
            }
        }
    }
}