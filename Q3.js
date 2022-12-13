const readline = require("readline");
console.log("Noah Dennis  -  Barton Peveril Sixth Form College");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tower {
    constructor(items) {
        this.items = items;
        this.fixed = [];
    }


}


rl.question("Start: ", (start) => {
    rl.question("End: ", (end) => {
        rl.close();
        let startTowers = [];
        let endTowers = [];

        start.split(' ').forEach(el => {
            let currentTower = [];
            el.split('').map(item => Number(item)).forEach(item => {
                if (item === 0) currentTower = [];
                else currentTower.push(item);
            })

            startTowers.push(new Tower(currentTower));
        })


        end.split(' ').forEach(el => {
            let currentTower = [];
            el.split('').map(item => Number(item)).forEach(item => {
                if (item === 0) currentTower = [];
                else currentTower.push(item);
            })

            endTowers.push(new Tower(currentTower));
        })

        for (let i = 0; i < startTowers.length; i++) {
            
        }

    })
});

