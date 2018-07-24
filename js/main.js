
//statments//
const
    mainWindow = document.getElementById("main"),
    gameWindow = document.getElementById("game"),
    warior = document.getElementById("warior"),
    wariorImg = document.getElementById("wariorImg"),
    dungeon = document.getElementById("dungeon"),
    scroll = document.getElementById("scroll"),
    navScroll = document.getElementById("navScroll"),
    scrollLayer = document.getElementById("scrollLayer"),
    cross = document.getElementById("cross"),
    signs = document.getElementById("signs"),
    lewer = document.getElementById("lewer"),
    smallScroll = Array.from(document.getElementsByClassName("smallScroll")),
    cloud = document.getElementById("cloud"),
    arrowLeft = document.getElementById("left"),
    arrowRight = document.getElementById("right"),
    portfolioWindows = document.getElementsByClassName("project"),
    portfolioInline = document.getElementById("portfolioInline"),
    specials = document.getElementsByClassName("special"),
    topLayers = Array.from(document.getElementsByClassName("topLayer")),
    techBlocks = Array.from(document.getElementsByClassName("techBlock")),
    scrollText = Array.from(document.getElementsByClassName("scrollText")),
    navigationLinks = Array.from(document.getElementsByClassName("navigation")),
    mapMatrix0 = [],
    mapMatrix1 = [],
    mapMatrix2 = [],
    mapMatrix3 = [],
    animVal = 10,
    moveScale = 4;

let
    posMap0Up = 0;
posMap0Down = 0,
    posMap1Down = 0,
    posMap1Right = 0,
    posMap2Up = 0,
    posMap2Right = 0,
    posMap3Up = 0,
    posMap3Down = 0,
    naviCounter = 0,
    pageNumber = 0,
    actualMap =[],
    windowWidth = document.body.offsetWidth,
    gameScale = 1,
    animStep = 0,
    navClick = 0,
    portfolioCounting = 0,
    portfolioPosition = 0,
    specialCounter = 0,
    scrollOpenCounter = 0;

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

criticalPositionsUpdate = () => {
    posMap0Up = hero.ySquare < 1 && hero.xSquare > 13;
    posMap0Down = hero.ySquare > 8 && hero.xSquare > 13;
    posMap1Down = hero.ySquare > 8 && hero.xSquare > 13;
    posMap1Right = hero.ySquare < 5 && hero.xSquare > 18;
    posMap2Up = hero.ySquare < 1 && hero.xSquare > 13;
    posMap2Right = hero.ySquare < 8 && hero.xSquare > 18;
    posMap3Up = hero.ySquare < 1 && hero.xSquare > 3;
    posMap3Down = hero.ySquare > 8 && hero.xSquare > 3;
};

scaling = (axis) => {
    if (axis == 'X' && hero.direction == 'left')
        hero.xSquare = Math.floor(hero.posX / (64 * gameScale));
    else if (axis == 'X' && hero.direction == 'right')
        hero.xSquare = Math.ceil(hero.posX / (64 * gameScale));
    if (axis == 'Y' && hero.direction == 'up')
        hero.ySquare = Math.floor(hero.posY / (64 * gameScale));
    else if (axis == 'Y' && hero.direction == 'down')
        hero.ySquare = Math.ceil(hero.posY / (64 * gameScale));
    if (axis == 'init') {
        hero.xSquare = Math.ceil(hero.posX / (64 * gameScale));
        hero.ySquare = Math.floor(hero.posY / (64 * gameScale));
    }
};

//moving functions//

animGenerator = () => {
    if (animStep < 2) {
        wariorImg.src = `img/knight/knight_${hero.direction}0.png`;
        animStep++;
    }
    else if (animStep >= 2 && animStep < animVal) {
        wariorImg.src = `img/knight/knight_${hero.direction}1.png`;
        animStep++;
    }
    else if (animStep >= animVal && animStep < animVal * 2) {
        wariorImg.src = `img/knight/knight_${hero.direction}2.png`;
        animStep++;
    }
    else if (animStep >= animVal * 2 && animStep < animVal * 3) {
        wariorImg.src = `img/knight/knight_${hero.direction}3.png`;
        animStep++;
    }
    else if (animStep >= animVal * 3 && animStep < animVal * 4) {
        wariorImg.src = `img/knight/knight_${hero.direction}4.png`;
        animStep++;
    }
    else if (animStep >= animVal * 4 && animStep < animVal * 5) {
        if (hero.direction == 'up' || hero.direction == 'down') {
            animStep = 0;
        } else {
            wariorImg.src = `img/knight/knight_${hero.direction}5.png`;
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
            hero.posX += moveScale;
            scaling('X');
            hero.direction = 'right';
            break;
        }
        case 2: {
            hero.posX -= moveScale;
            scaling('X');
            hero.direction = 'left';
            break;
        }
        case 3: {
            hero.posY -= moveScale;
            scaling('Y');
            hero.direction = 'up';
            break;
        }
        case 4: {
            hero.posY += moveScale;
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
    mapInitialization(mapMatrix0);
    mapInitialization(mapMatrix1);
    mapInitialization(mapMatrix2);
    mapInitialization(mapMatrix3);
    mapMatrix0.forEach(([xMap, yMap], index) => {
        if (((yMap == 4 || yMap == 5) && xMap < 15) || (xMap == 14 || xMap == 15))
            mapMatrix0[index][2] = true;
    });
    mapMatrix1.forEach(([xMap, yMap], index) => {
        if (yMap == 0 || yMap == 9 || xMap == 0 || xMap == 1 || xMap == 18 || xMap == 19)
            mapMatrix1[index][2] = false;
        else
            mapMatrix1[index][2] = true;
        if ((yMap == 9 && (xMap == 14 || xMap == 15)) || ((yMap == 3 || yMap == 4) && (xMap == 18 || xMap == 19)))
            mapMatrix1[index][2] = true;
    });
    mapMatrix2.forEach(([xMap, yMap], index) => {
        if (yMap == 0 || yMap == 9 || xMap == 0 || xMap == 1 || xMap == 18 || xMap == 19)
            mapMatrix2[index][2] = false;
        else
            mapMatrix2[index][2] = true;
        if ((yMap == 0 && (xMap == 14 || xMap == 15)) || ((yMap == 6 || yMap == 7) && (xMap == 18 || xMap == 19)))
            mapMatrix2[index][2] = true;
    });
    mapMatrix3.forEach(([xMap, yMap], index) => {
        if (yMap == 0 || yMap == 9 || xMap == 0 || xMap == 1 || xMap == 18 || xMap == 19)
            mapMatrix3[index][2] = false;
        else
            mapMatrix3[index][2] = true;
        if ((yMap == 0 || yMap == 9) && (xMap == 4 || xMap == 5))
            mapMatrix3[index][2] = true;
    });
};

mapChosing = (i) => {
    document.getElementById('loader').classList.add('loader');
    switch (pageNumber) {
        case 0: {
            actualMap = mapMatrix0;
            break
        }
        case 1: {
            actualMap = mapMatrix1;
            break
        }
        case 2: {
            actualMap = mapMatrix2;
            break
        }
        case 3: {
            actualMap = mapMatrix3;
            break
        }
    }
    if (i != 0)
        mapEdit();
};

mapDrawing = () => {
    actualMap.forEach(([], index) => {
        const brick = document.createElement("img");
        brick.id = `brick${index}`;
        if (actualMap[index][2] == true)
            brick.src = "img/bricks/brick1.png";
        else
            brick.src = "img/bricks/brick2.png";
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
            brick.src = "img/bricks/brick1.png";
        else
            brick.src = "img/bricks/brick2.png";
    });
    wariorPositioning = (mapNumber) => {
        hero.posX = parseInt(warior.style.left, 10);
        hero.posY = parseInt(warior.style.top, 10);
        scaling('init');
        topLayers.forEach((topLayer, index) => {
            if (index == mapNumber)
                topLayer.style.display = "flex";
            else
                topLayer.style.display = "none";
        });
    };
    if (pageNumber == 0 && posMap1Down) {
        document.getElementById('shadowLayer').style.visibility = 'visible';
        warior.style.left = `${64 * gameScale * 14.5}px`;
        warior.style.top = `${64 * gameScale * 0.5}px`;
    }
    else if (pageNumber == 0 && posMap2Up) {
        warior.style.left = `${64 * gameScale * 14.5}px`;
        warior.style.top = `${64 * gameScale * 9}px`;
    }
    else if (pageNumber == 1 && posMap0Up) {
        warior.style.left = `${64 * gameScale * 14.5}px`;
        warior.style.top = `${64 * gameScale * 9}px`;
    }
    else if (pageNumber == 1 && posMap3Up) {
        warior.style.left = `${64 * gameScale * 19}px`;
        warior.style.top = `${64 * gameScale * 3.5}px`;
    }
    else if (pageNumber == 2 && posMap0Down) {
        warior.style.left = `${64 * gameScale * 14.5}px`;
        warior.style.top = `${64 * gameScale * 0}px`;
    }
    else if (pageNumber == 2 && posMap3Down) {
        warior.style.left = `${64 * gameScale * 19}px`;
        warior.style.top = `${64 * gameScale * 6.5}px`;
    }
    else if (pageNumber == 3 && posMap1Right) {
        warior.style.left = `${64 * gameScale * 4.5}px`;
        warior.style.top = `${64 * gameScale * 0}px`;
    }
    else if (pageNumber == 3 && posMap2Right) {
        warior.style.left = `${64 * gameScale * 4.5}px`;
        warior.style.top = `${64 * gameScale * 9}px`;
    }
    wariorPositioning(pageNumber);
    shadow(1);
};

//Actions//

naviFunction = (n) => {
    console.log(n);
    document.getElementById('shadowLayer').style.visibility = 'hidden';
    pageNumber = n;
    switch (n) {
        case 0: {
            warior.style.left = `${64 * gameScale * 12}px`;
            warior.style.top = `${64 * gameScale * 4.5}px`;
            mapChosing(1);
            scrollOpen(0);
            scrollOpenCounter = 1;
            break
        }
        case 1: {
            warior.style.left = `${64 * gameScale * 2}px`;
            warior.style.top = `${64 * gameScale * 5}px`;
            mapChosing(1);
            technicActivation();
            break
        }
        case 2: {
            warior.style.left = `${64 * gameScale * 2}px`;
            warior.style.top = `${64 * gameScale * 5}px`;
            specialCounter = 3;
            mapChosing(1);
            portfolioActivation();
            break
        }
        case 3: {
            warior.style.left = `${64 * gameScale * 15}px`;
            warior.style.top = `${64 * gameScale * 5}px`;
            mapChosing(1);
            chest();
            scrollOpen(0);
            scrollOpenCounter = 1;
            break
        }
    }
}

lightObjects = () => {
    criticalPositionsUpdate();
    if ((11 < hero.xSquare && hero.xSquare < 13) &&
        (3 < hero.ySquare && hero.ySquare < 6))
        smallScroll[0].classList.add("light");
    else
        smallScroll[0].classList.remove("light");
    if (hero.xSquare == 15 && hero.ySquare == 4 && pageNumber == 0)
        signs.classList.add("light");
    else
        signs.classList.remove("light");
    if (hero.xSquare < 3 && hero.ySquare > 3 && hero.ySquare < 6 && pageNumber == 1)
        lewer.classList.add("light");
    else
        lewer.classList.remove("light");
    if ((13 < hero.xSquare && hero.xSquare < 16) &&
        (5 < hero.ySquare && hero.ySquare < 9))
        smallScroll[1].classList.add("light");
    else
        smallScroll[1].classList.remove("light");
    if ((13 < hero.xSquare && hero.xSquare < 16) &&
        (0 < hero.ySquare && hero.ySquare < 3))
        smallScroll[2].classList.add("light");
    else
        smallScroll[2].classList.remove("light");
    if ((12 < hero.xSquare && hero.xSquare < 16) &&
        (3 < hero.ySquare && hero.ySquare < 6) && pageNumber == 3)
        smallScroll[3].classList.add("light");
    else
        smallScroll[3].classList.remove("light");
    if ((14 < hero.xSquare && hero.xSquare < 17) &&
        (3 < hero.ySquare && hero.ySquare < 6) && pageNumber == 3) {
        document.getElementById('chest').classList.add("light");
    }
    else
        document.getElementById('chest').classList.remove("light");
    if (posMap0Up && (pageNumber == 0 || pageNumber == 2)) {
        document.getElementById("brick14").src = "img/bricks/brickLightUp.png";
        document.getElementById("brick15").src = "img/bricks/brickLightUp.png";
    }
    else if (pageNumber == 0 || pageNumber == 2) {
        document.getElementById("brick14").src = "img/bricks/brick1.png";
        document.getElementById("brick15").src = "img/bricks/brick1.png";
    }
    if (posMap1Down && (pageNumber == 0 || pageNumber == 1)) {
        document.getElementById("brick194").src = "img/bricks/brickLightDown.png";
        document.getElementById("brick195").src = "img/bricks/brickLightDown.png";
    }
    else if (pageNumber == 0 || pageNumber == 1) {
        document.getElementById("brick194").src = "img/bricks/brick1.png";
        document.getElementById("brick195").src = "img/bricks/brick1.png";
    }
    if (posMap1Right && pageNumber == 1) {
        document.getElementById("brick79").src = "img/bricks/brickLightRight.png";
        document.getElementById("brick99").src = "img/bricks/brickLightRight.png";
    }
    else if (pageNumber == 1) {
        document.getElementById("brick79").src = "img/bricks/brick1.png";
        document.getElementById("brick99").src = "img/bricks/brick1.png";
    }
    if (posMap2Right && pageNumber == 2) {
        document.getElementById("brick139").src = "img/bricks/brickLightRight.png";
        document.getElementById("brick159").src = "img/bricks/brickLightRight.png";
    }
    else if (pageNumber == 2) {
        document.getElementById("brick139").src = "img/bricks/brick1.png";
        document.getElementById("brick159").src = "img/bricks/brick1.png";
    }
    if (posMap3Up && pageNumber == 3) {
        document.getElementById("brick4").src = "img/bricks/brickLightUp.png";
        document.getElementById("brick5").src = "img/bricks/brickLightUp.png";
    }
    else if (pageNumber == 3) {
        document.getElementById("brick4").src = "img/bricks/brick1.png";
        document.getElementById("brick5").src = "img/bricks/brick1.png";
    }
    if (posMap3Down && pageNumber == 3) {
        document.getElementById("brick184").src = "img/bricks/brickLightDown.png";
        document.getElementById("brick185").src = "img/bricks/brickLightDown.png";
    }
    else if (pageNumber == 3) {
        document.getElementById("brick184").src = "img/bricks/brick1.png";
        document.getElementById("brick185").src = "img/bricks/brick1.png";
    }
}

cloudsClose = () => {
    if ((hero.xSquare != 15 || hero.ySquare != 4) && actualMap == mapMatrix0)
        cloud.style.visibility = "hidden";
}

scrollOpen = (n) => {
    scrollLayer.style.display = "flex";
    opening = () => {
        scroll.style.display = "initial";
        mainWindow.style.filter = "blur(15px)";
        scrollText.forEach((elem, index) => {
            if (index == pageNumber + 1 - n)
                elem.style.display = "initial";
            else
                elem.style.display = "none";
        });
    }
    if ((11 < hero.xSquare && hero.xSquare < 13) &&
        (3 < hero.ySquare && hero.ySquare < 6) &&
        pageNumber == 0) {
        opening();
    }
    if ((13 < hero.xSquare && hero.xSquare < 16) &&
        (5 < hero.ySquare && hero.ySquare < 9) &&
        pageNumber == 1) {
        opening();
    }
    if ((13 < hero.xSquare && hero.xSquare < 16) &&
        (0 < hero.ySquare && hero.ySquare < 3) &&
        pageNumber == 2) {
        opening();
    }
    if ((12 < hero.xSquare && hero.xSquare < 16) &&
        (3 < hero.ySquare && hero.ySquare < 6) && pageNumber == 3) {
        opening();
    }
    if (n == 1) {
        scrollOpenCounter = 1;
        opening();
    }
}
portfolioRight = () => {
    console.log(portfolioPosition);
    if (portfolioCounting >= 4) {
        portfolioCounting = 0;
        portfolioPosition = 0;
        portfolioInline.style.left = `${portfolioPosition}px`;
    }
    else {
        portfolioCounting++;
        portfolioPosition -= 480;
        portfolioInline.style.left = `${portfolioPosition}px`;
    }
}

portfolioLeft = () => {
    if (portfolioCounting <= 0) {
        portfolioCounting = 4;
        portfolioPosition = -1920;
        portfolioInline.style.left = `${portfolioPosition}px`;
    }
    else {
        portfolioCounting--;
        portfolioPosition += 480;
        portfolioInline.style.left = `${portfolioPosition}px`;
    }
}
technicActivation = () => {
    if (hero.xSquare < 3 && hero.ySquare > 3 && hero.ySquare < 6 && pageNumber == 1) {
        lewer.classList.remove("light");
        lewer.classList.add("down");
        document.getElementById('shadowLayer').style.visibility = 'hidden';
        techBlocks.forEach((techBlock, index) => {
            techBlock.classList.add("move");
        })
    }
};

portfolioActivation = () => {
    if (hero.xSquare == 3 && hero.ySquare == 3 && specialCounter == 0) {
        Array.from(specials)[0].classList.add('light');
        specialCounter++;
    }
    else if (hero.xSquare == 3 && hero.ySquare == 5 && specialCounter == 1) {
        Array.from(specials)[1].classList.add('light');
        specialCounter++;
    }
    else if (hero.xSquare == 3 && hero.ySquare == 7 && specialCounter == 2) {
        Array.from(specials)[2].classList.add('light');
        specialCounter++;
    }
    if (specialCounter == 3) {
        document.getElementById('shadowLayer').style.visibility = 'hidden';
        portfolioInline.style.visibility = 'initial';
        arrowLeft.style.visibility = 'initial';
        arrowRight.style.visibility = 'initial';
    }
}

chest = () => {
    smallScroll[3].classList.add('throw');
    document.getElementById("chest").classList.add("open");
}

//Initialization//

shadow = (init) => {
    const wariorLayer = document.getElementById('shadowLayer');
    const wariorLayerContext = wariorLayer.getContext("2d");
    const shadowScalex = 300 / 1280;
    const shadowScaleY = 150 / 640;
    console.log(hero.posX, hero.posY);
    let gradient = wariorLayerContext.createRadialGradient(hero.posX * shadowScalex, hero.posY * shadowScaleY, 30, hero.posX * shadowScalex, hero.posY * shadowScaleY, 50);
    console.log(hero.posX / shadowScalex, hero.posY / shadowScaleY);
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
};

initialValues = () => {
    resize();
    mapGeneration();
    mapChosing(0);
    mapDrawing();
    warior.style.left = `${64 * gameScale}px`;
    warior.style.top = `${64 * gameScale * 4.5}px`;
    hero.posX = parseInt(warior.style.left, 10);
    hero.posY = parseInt(warior.style.top, 10);
    scaling('init');
    shadow(0);
    const layers = document.getElementsByClassName("layer");
    Array.from(layers).forEach((layer) => {
        layer.style.height = `${640 * gameScale}px`;
    });
    warior.style.transform = `scale(${gameScale}, ${gameScale})`;
    console.log(hero.posX, hero.posY);
    topLayers.forEach((topLayer, index) => {
        if (index == 0)
            topLayer.style.display = "initial";
        else
            topLayer.style.display = "none";
    })
    scrollOpen(1);
};

resize = () => {
    let windowScale = (windowWidth / 1600);
    gameWindow.style.transform = `scale(${windowScale}, ${windowScale})`;
    scroll.style.transform = `scale(${windowScale * 1.3}, ${windowScale * 1.3})`;
    console.log('ss');
}

scrollClosing = () => {
    scroll.style.display = "none";
    scrollLayer.style.display = "none";
    document.getElementById("main").style.filter = "none";
    scrollOpenCounter = 0;
}

menuOpen = (event) => {
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
    event.stopPropagation();
}

// Key handling //

function checkKeyDown(key) {
    key = key || window.event;
    if (key.keyCode == '38') {
        // up aryMap
        hero.moveUp();
        warior.style.top = (`${hero.posY}px`);
        console.log(Array.from(navScroll.classList))
    }
    else if (key.keyCode == '40') {
        // down aryMap
        hero.moveDown();
        warior.style.top = (`${hero.posY}px`);
    }
    else if (key.keyCode == '37') {
        // left aryMap
        hero.moveLeft();
        warior.style.left = (`${hero.posX}px`);
    }
    else if (key.keyCode == '39') {
        // right aryMap
        hero.moveRight();
        warior.style.left = (`${hero.posX}px`);
    }
    else if (key.keyCode == '32') {
        //space
        if (hero.xSquare == 15 && hero.ySquare == 4 && pageNumber == 0) {
            cloud.style.visibility = "visible";
            cloud.style.left = (`${(hero.posX) - 120}px`);
            cloud.style.top = (`${(hero.posY) - 150}px`);
        }
        technicActivation();;
        if (scrollOpenCounter == 1) {
            scrollClosing();
        }
        else if (scrollOpenCounter == 0) {
            scrollOpen(0);
            scrollOpenCounter = 1;
        }
        if ((14 < hero.xSquare && hero.xSquare < 17) &&
            (3 < hero.ySquare && hero.ySquare < 6) && pageNumber == 3) {
            chest();
        }
        if ((posMap1Down && pageNumber == 1) ||
            (posMap2Up && pageNumber == 2)) {
            pageNumber = 0;
            mapChosing(1);
            console.log(pageNumber);
        }
        else if ((posMap0Up && pageNumber == 0) ||
            (posMap3Up && pageNumber == 3)) {
            pageNumber = 1;
            mapChosing(1);
        }
        else if ((posMap0Down && pageNumber == 0) ||
            (posMap3Down && pageNumber == 3)) {
            pageNumber = 2;
            mapChosing(1);
            console.log(pageNumber);
        }
        else if ((posMap1Right && pageNumber == 1) ||
            (posMap2Right && pageNumber == 2)) {
            pageNumber = 3;
            mapChosing(1);
        };
        portfolioActivation();
    };
};

checkKeyUp = (key) => {
    key = key || window.event;
    hero.move = false;
    if (hero.move === false) {
        animStep = 0;
        wariorImg.src = 'img/knight/knight_stop.png';
    };
};
window.onload = initialValues;
document.onkeyup = checkKeyUp;
document.onkeydown = checkKeyDown;
navScroll.addEventListener("click", menuOpen);
document.body.addEventListener("click", () => {
    if (navClick == 1) {
        navScroll.classList.remove("navOpen");
        navClick = 0;
    }
})
cross.addEventListener("click", scrollClosing);
arrowLeft.addEventListener("click", portfolioLeft);
arrowRight.addEventListener("click", portfolioRight);


