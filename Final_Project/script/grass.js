class Grass {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;

        this.directions = [
            [this.x - 1,this.y - 1],
            [this.x    ,this.y - 1],
            [this.x + 1,this.y - 1],
            [this.x - 1,this.y    ],
            [this.x + 1,this.y    ],
            [this.x - 1,this.y + 1],
            [this.x    ,this.y + 1],
            [this.x + 1,this.y + 1]
        ];
    }

    chooseCell(char) {
        let found = [];

        for(let i = 0;i < this.directions.length;i++) {
            let 
            x = this.directions[i][0],
            y = this.directions[i][1];

            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if(matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;
    }

    mul() {
        let 
        empty = this.chooseCell(0),
        randomEmpty = random(empty);

        this.multiplay++;

        if(randomEmpty && this.multiplay > 2) {

            let 
            x = randomEmpty[0],
            y = randomEmpty[1];
            matrix[y][x] = 1;
            let grass = new Grass(x,y);
            grassArr.push(grass);

            this.multiplay = 0;
        }
        
    }
    }