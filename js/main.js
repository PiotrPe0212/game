
//statments//

const warior = document.getElementById("warior");
const wariorImg = document.getElementById("wariorImg");
const dungeon = document.getElementById("dungeon");
const mapMatrix1 = [];
const mapMatrix2 = [];
const animVal = 10;
const moveScale = 4;

let pageNumber = 0;
let actualMap;
let windowWidth = document.body.offsetWidth;
let gameHeight = document.body.offsetHeight;
let gameWidth = windowWidth * 0.8;
let gameScale = gameWidth / 1280;
let animStep = 0;

//main object//

let hero = {
    posX: 0,
    posY: 0,
    xSquare: 0,
    ySquare: 0,
    move: false,
    direction: 'right',
    endX: false,
    endY: false,

    moveRight: () => {

        colision('X');
        if (hero.endX == true && hero.direction != 'right') {
            hero.endX = false;
        }
        if (hero.endX == false) {
            moving(1);
        };

    },
    moveLeft: () => {

        colision('X');

        if (hero.endX == true && hero.direction != 'left') {
            hero.endX = false;
        };
        if (hero.endX == false) {
            moving(2);
        };


    },
    moveUp: () => {

        colision('Y');

        if (hero.endY == true && hero.direction != 'up') {
            hero.endY = false;
        }
        if (hero.endY == false) {
            moving(3);
        };
    },
    moveDown: () => {

        colision('Y');

        if (hero.endY == true && hero.direction != 'down') {
            hero.endY = false;
        }
        if (hero.endY == false) {
            moving(4);
        }
    }

};

scaling = (axis) => {
    if (axis == 'X' && hero.direction == 'left')
        hero.xSquare = Math.floor(hero.posX / (16 * gameScale));
    else if (axis == 'X' && hero.direction == 'right')
        hero.xSquare = Math.ceil(hero.posX / (16 * gameScale));

    if (axis == 'Y' && hero.direction == 'up')
        hero.ySquare = Math.floor(hero.posY / (16 * gameScale));
    else if (axis == 'Y' && hero.direction == 'down')
        hero.ySquare = Math.ceil(hero.posY / (16 * gameScale));

    if (axis == 'init') {
        hero.xSquare = Math.ceil(hero.posX / (16 * gameScale));
        hero.ySquare = Math.floor(hero.posY / (16 * gameScale));

    }

};
//moving functions//

animGenerator = () => {
    if (animStep < 2) {
        wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_0.png`;
        animStep++;
    }
    else if (animStep >= 2 && animStep < animVal) {
        wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_1.png`;
        animStep++;
    }
    else if (animStep >= animVal && animStep < animVal * 2) {
        wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_2.png`;
        animStep++;
    }
    else if (animStep >= animVal * 2 && animStep < animVal * 3) {
        wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_3.png`;
        animStep++;
    }
    else if (animStep >= animVal * 3 && animStep < animVal * 4) {
        wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_4.png`;
        animStep++;
    }
    else if (animStep >= animVal * 4 && animStep < animVal * 5) {
        if (hero.direction == 'up' || hero.direction == 'down') {
            animStep = 0;

        } else {
            wariorImg.src = `img/knight/knight iso char_run ${hero.direction}_5.png`;
            animStep++;
        }
    }
    else if (animStep >= animVal * 5) {
        animStep = 0;
    }
};
colision = (posEnd) => {
    if (posEnd == 'X') {
        if (hero.endY == true && hero.direction == 'up') {
            hero.posY++;
            scaling('Y');
            hero.endY = false;
        }
        else if (hero.endY == true && hero.direction == 'down') {
            hero.posY--;
            scaling('Y');
            hero.endY = false;
        }
    };
    if (posEnd == 'Y') {
        if (hero.endX == true && hero.direction == 'right') {
            hero.posX--;
            scaling('X');
            hero.endX = false;

        }
        else if (hero.endX == true && hero.direction == 'left') {
            hero.posX++;
            scaling('X');
            hero.endX = false;

        }
    }

    actualMap.forEach(([x, y, state], index) => {
        if ((hero.xSquare == x && hero.ySquare == y && state == false)
            || hero.xSquare < 0 || hero.xSquare > 19 || hero.ySquare < 0 || hero.ySquare > 9) {
            if (posEnd == 'X')
                hero.endX = true;
            else if (posEnd == 'Y')
                hero.endY = true;
        }
    });
    console.log(hero.xSquare);
    console.log(hero.ySquare);
};

moving = (direction) => {
    hero.move = true;
    switch (direction) {
        case 1: {
            hero.posX++;
            scaling('X');
            hero.direction = 'right';
            break;
        }
        case 2: {
            hero.posX--;
            scaling('X');
            hero.direction = 'left';
            break;
        }
        case 3: {
            hero.posY--;
            scaling('Y');
            hero.direction = 'up';
            break;
        }
        case 4: {
            hero.posY++;
            scaling('Y');
            hero.direction = 'down'
            break
        }
    };
    animGenerator();
};

//map functions//

mapInitialization = (map) => {
    let xMap = 0;
    let yMap = 0;
    for (let i = 0; i < 200; i++) {
        map.push([xMap, yMap, false]);
        xMap++;
        if (xMap == 20) {
            yMap++;
            xMap = 0;
        }
    };
    xMap = 0;
    yMap = 0;

};
mapGeneration = () => {
    mapInitialization(mapMatrix1);
    mapInitialization(mapMatrix2);
    mapMatrix1.forEach(([xMap, yMap], index) => {
        if (((yMap == 4 || yMap == 5) && xMap < 15) || (xMap == 14 || xMap == 15))
            mapMatrix1[index][2] = true;
    });
    mapMatrix2.forEach(([xMap, yMap], index) => {
        if (yMap == 0 || yMap == 9 || xMap == 0 || xMap == 1 || xMap == 18 || xMap == 19)
            mapMatrix2[index][2] = false;
        else
            mapMatrix2[index][2] = true;
        if ((yMap == 9 && (xMap == 14 || xMap == 15)) || ((yMap == 3 || yMap == 4) && (xMap == 18 || xMap == 19)))
            mapMatrix2[index][2] = true;

    });
};
mapChosing = () => {
    switch (pageNumber) {
        case 0: {
            actualMap = mapMatrix1;
            break
        }
        case 1: {
            actualMap = mapMatrix2;
            break
        }
    }
};


mapDrawing = () => {
    actualMap.forEach(([], index) => {
        const brick = document.createElement("img");
        brick.id = `brick${index}`;
        if (actualMap[index][2] == true)
            brick.src = "img/bricks/bricks64black.png";
        else
            brick.src = "img/bricks/bricks64.png";
        dungeon.appendChild(brick);
        brick.style.position = "relative";
        brick.style.width = `${64 * gameScale}px`;
        brick.style.height = `${64 * gameScale}px`;
    });
};
mapEdit = () => {
    actualMap.forEach(([], index) => {
        const brick = document.getElementById(`brick${index}`);
        if (actualMap[index][2] == true)
            brick.src = "img/bricks/bricks64black.png";
        else
            brick.src = "img/bricks/bricks64.png";
    });
};

//Initialization//

initialValues = () => {
    mapGeneration();
    mapChosing();
    mapDrawing();
    warior.style.left = `${64 * gameScale}px`;
    warior.style.top = `${64 * gameScale * 4.5}px`;
    hero.posX = parseInt(warior.style.left, 10) / moveScale;
    hero.posY = parseInt(warior.style.top, 10) / moveScale;
    scaling('init');
    const layers = document.getElementsByClassName("layer");
    Array.from(layers).forEach((layer) => {
        layer.style.height = `${640 * gameScale}px`;
    });
    warior.style.transform = `scale(${gameScale}, ${gameScale})`;
};

// Interface  //

scrollAnimation = () =>{

    
}
// Key handling //

function checkKeyDown(key) {
    document.getElementById('loader').classList.remove('loader');
    key = key || window.event;

    if (key.keyCode == '38') {
        // up aryMap
        hero.moveUp();
        warior.style.top = (`${hero.posY * 4}px`);

    }
    else if (key.keyCode == '40') {
        // down aryMap
        hero.moveDown();
        warior.style.top = (`${hero.posY * 4}px`);
    }
    else if (key.keyCode == '37') {
        // left aryMap
        hero.moveLeft();
        warior.style.left = (`${hero.posX * 4}px`);
    }
    else if (key.keyCode == '39') {
        // right aryMap
        hero.moveRight();
        warior.style.left = (`${hero.posX * 4}px`);
    }
    else if (key.keyCode == '32') {
        if(hero.ySquare < 1 && hero.xSquare == 15 ){
        document.getElementById('loader').classList.add('loader');
        pageNumber = 1;};
       
        if (pageNumber == 1){
            actualMap = mapMatrix2;

        setTimeout(() => { mapEdit(); }, 500);
        }
        // setTimeout(()=>{ document.getElementById('loader').classList.remove('loader');}, 1500);

    };
   
};

function checkKeyUp(key) {
    key = key || window.event;
    hero.move = false;
    if (hero.move === false) {
        animStep = 0;
        wariorImg.src = 'img/knight/knight iso char_idle_0.png';
    };
};

window.onload = initialValues;
// document.getElementsByTagName("BODY")[0] = initialValues;
// document.addEventListener("resize", initialValues());
document.onkeyup = checkKeyUp;
document.onkeydown = checkKeyDown;

