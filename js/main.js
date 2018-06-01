
//statments//

const warior = document.getElementById("warior");
const wariorImg = document.getElementById("wariorImg");
const dungeon = document.getElementById("dungeon");
const scroll = document.getElementById("scroll");
const navScroll = document.getElementById("navScroll");
const cross = document.getElementById("cross");
const signs = document.getElementById("signs");
const lewer = document.getElementById("lewer");
const cloud = document.getElementById("cloud");
const topLayers = Array.from(document.getElementsByClassName("topLayer"));
const techBlocks = Array.from(document.getElementsByClassName("techBlock"));
const mapMatrix1 = [];
const mapMatrix2 = [];
const animVal = 10;
const moveScale = 4;

let pageNumber = 0;
let actualMap;
let windowWidth = document.body.offsetWidth;
let gameHeight = document.body.offsetHeight;
let gameWidth = windowWidth * 0.7;
let gameScale = gameWidth / 1280;
let animStep = 0;
let navClick = 0;
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
};

moving = (direction) => {
    console.log(hero.posX, hero.posY);

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
    shadow(1);
    lightObjects();
    cloudsClose();
    console.log(hero.xSquare, hero.ySquare);

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
    if(actualMap == mapMatrix2){
        warior.style.left = `${64 * gameScale*15}px`;
        warior.style.top = `${64 * gameScale * 8}px`;
    
    hero.posX = parseInt(warior.style.left, 10) / moveScale;
    hero.posY = parseInt(warior.style.top, 10) / moveScale;
    scaling('init');
    topLayers.forEach((topLayer,index)=>{

        if(index == 1)
        topLayer.style.visibility = "visible";
        else
        topLayer.style.visibility = "hidden";
    })
}
};

//Actions//
lightObjects = () => {
    if (hero.xSquare == 15 && hero.ySquare == 4 && actualMap == mapMatrix1)
        signs.classList.add("light");
    else
        signs.classList.remove("light");

    if (hero.xSquare == 1 && hero.ySquare == 4 && actualMap == mapMatrix2)
        lewer.classList.add("light");
    else
        lewer.classList.remove("light");
}
cloudsClose = ()=>{
    if ((hero.xSquare != 15 || hero.ySquare != 4) && actualMap == mapMatrix1)
    cloud.style.visibility = "hidden";


}
//Initialization//
shadow = (init) => {

    const wariorLayer = document.getElementById('shadowLayer');
    const wariorLayerContext = wariorLayer.getContext("2d");
    console.log(hero.posX, hero.posY);
    let gradient = wariorLayerContext.createRadialGradient((hero.posX + 6) * 1.2, (hero.posY + 6) * 1.2, 30, (hero.posX + 6) * 1.2, (hero.posY + 6) * 1.2, 50);
    console.log(hero.posX, hero.posY);
    gradient.addColorStop(0, "rgba(194, 168, 120, 0.027)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    wariorLayerContext.fillStyle = gradient;
    switch (init) {
        case 0: {

            wariorLayerContext.fillRect(0, 0, 300, 150);
            break;
        }
        case 1: {
            wariorLayerContext.clearRect(0, 0, 300, 150);
            wariorLayerContext.fillRect(0, 0, 300, 150);
            break;
        }
    };
    console.log(hero.posX, hero.posY);

};
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
    console.log(hero.posX, hero.posY);
    shadow(0);
    topLayers.forEach((topLayer,index)=>{

        if(index == 0)
        topLayer.style.visibility = "visible";
        else
        topLayer.style.visibility = "hidden";
    })
};

// Interface  //

scrollAnimation = () => {
    scroll.classList.add("scroll");
    Array.from(document.getElementsByClassName('text'))[0].style.visibility = "initial";

}
scrollClosing = () => {
    scroll.style.display = "none";
    document.getElementById("main").style.filter = "none";
}
menuOpen = () => {
    switch (navClick) {
        case 0: {
            navScroll.classList.add("navOpen");

            navClick++;
            break;
        }
        case 1: {

            navScroll.classList.remove("navOpen");

            navClick = 0;
            break;
        }
    }
}

// Key handling //

function checkKeyDown(key) {
    document.getElementById('loader').classList.remove('loader');
    key = key || window.event;

    if (key.keyCode == '38') {
        // up aryMap
        hero.moveUp();
        warior.style.top = (`${hero.posY * 4}px`);
        console.log(Array.from(navScroll.classList))

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
        //space
        if (hero.xSquare == 15 && hero.ySquare == 4 && actualMap == mapMatrix1){
            cloud.style.visibility = "visible";
            cloud.style.left = (`${(hero.posX * 4)-120}px`);
            cloud.style.top = (`${(hero.posY * 4)-200}px`);
        }

        if (hero.xSquare == 1 && hero.ySquare == 4 && actualMap == mapMatrix2){
            lewer.classList.remove("light");
            lewer.classList.add("down");
            document.getElementById('shadowLayer').style.visibility = 'hidden';
            techBlocks.forEach((techBlock, index)=>{
                techBlock.classList.add("move");

            })
    
        }
            if (hero.ySquare < 1 && hero.xSquare == 15 && actualMap ==mapMatrix1) {
                document.getElementById('loader').classList.add('loader');
                pageNumber = 1;
                actualMap = mapMatrix2;

                setTimeout(() => {  mapEdit(), shadow(0)}, 500);
            };

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
window.onload = scrollAnimation();
window.onload = initialValues;
// document.getElementsByTagName("BODY")[0] = initialValues;
// document.addEventListener("resize", initialValues());
document.onkeyup = checkKeyUp;
document.onkeydown = checkKeyDown;
navScroll.addEventListener("click", menuOpen);
cross.addEventListener("click", scrollClosing);
// document.addEventListener("click", menuClose);

