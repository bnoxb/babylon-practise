const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    // create the scene space ----------------------------------------------------------------------------
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);

    // ------------------------------------------- Cameras ---------------------------------------------
    // const camera = new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 30, 30), scene);
    // camera.attachControl(canvas, true);
    // camera.radius = 200;
    // camera.heightOffset = 70;
    // camera.rotationOffset = 90;

    const camera = new BABYLON.ArcRotateCamera("Camera", -.1 *Math.PI *2 , .9 * Math.PI/2, 100, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // ---------------------------------------------Lights --------------------------------------------------
    const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(15, 100, -30), scene);
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(0, 0, 0);

    // ========================================   Axes   ===================================================
    // 
    /*********************************Start World Axes********************/
    var showAxis = function (size) {
    var makeTextPlane = function (text, color, size) {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
        var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
        return plane;
    };

    var axisX = BABYLON.Mesh.CreateLines("axisX", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    };
    /***************************End World Axes***************************/
    // axes size control
    showAxis(50);

    // =====================================    Materials   ===================================================
    const bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
    bodyMaterial.ambientColor = new BABYLON.Color3(1, .25, .25);
    bodyMaterial.backFaceCulling = false;

    const pitMaterial = new BABYLON.StandardMaterial("pitMaterial", scene);
    pitMaterial.ambientColor = new BABYLON.Color3(.25, .25, 1);
    //bodyMaterial.backFaceCulling = false;
    pitMaterial.alpha = .5;

    const ghostMat = new BABYLON.StandardMaterial("ghostMat", scene);
    ghostMat.ambientColor = new BABYLON.Color4(0, 0, 0,);
    ghostMat.alpha = 0;

    const lightMat = new BABYLON.StandardMaterial("lightMat", scene);
    lightMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

    const starMat = new BABYLON.StandardMaterial("starMart", scene);
    lightMat.emissiveColor = new BABYLON.Color3(1, .7, 0);

    // ===================================== MeshArrays =========================================
    const pitShape = [
        new BABYLON.Vector3(0, 30, 5),
        new BABYLON.Vector3(7.5, 30, 12.5),
        new BABYLON.Vector3(-7.5, 30, 12.5),
        new BABYLON.Vector3(-12.5, 30, 5),
        new BABYLON.Vector3(0, 30, 5)
    ];
    const bodyShape = [
        new BABYLON.Vector3(-20, 0, 0),
        new BABYLON.Vector3(-20, 0, 5),
        new BABYLON.Vector3(0, 0, 5),
        new BABYLON.Vector3(10, 0, 15),
        new BABYLON.Vector3(25, 0, 18),
        new BABYLON.Vector3(20, 0, 0),
        new BABYLON.Vector3(-20, 0, 0),
    ];
    const wingShape = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(15, 0, 0),
        new BABYLON.Vector3(15, 0, 15),
        new BABYLON.Vector3(20, 0, 25),
        new BABYLON.Vector3(13, 0, 25),
        new BABYLON.Vector3(0, 0, 8)
    ]

    const pitColors = [
        new BABYLON.Color4(0, 0, 1, .5),
        new BABYLON.Color4(0, 0, 1, .5),
        new BABYLON.Color4(0, 0, 1, .5)
    ];
    const bodyColors = [
        new BABYLON.Color4(.8, .8, 0.25, 1),
        new BABYLON.Color4(.5, .5, 180/255, 1),
        new BABYLON.Color4(.8, 0.8, 0.25, 1),
    ]; 
    const positionExtrudeX =  .75 * 2* Math.PI;


    // ====================================== Meshes =========================================
    // CAM TARGET
    const camTarget = BABYLON.MeshBuilder.CreateSphere("camTarget", {diamter: 1}, scene);
    camTarget.material = ghostMat;

    // the lightbulb ******************************************************************************************************
    const lightBulb = BABYLON.MeshBuilder.CreateSphere("lightBulb", {diameter: 2}, scene);
    lightBulb.material = lightMat;
    lightBulb.position.y = 100;
    lightBulb.position.x = 15;
    lightBulb.position.z = -30;
    
    // the ship body **************************************************************************************************
    const shipBody = BABYLON.MeshBuilder.ExtrudePolygon("shipBody", {shape: bodyShape, depth: 20, faceColors: bodyColors}, scene);
    shipBody.material = bodyMaterial;
    shipBody.rotate(BABYLON.Axis.X, positionExtrudeX, BABYLON.Space.LOCAL);

    //the cockpit *********************************************************************************************
    const shipPit = BABYLON.MeshBuilder.ExtrudePolygon("shipPit", {shape: pitShape, depth: 15, faceColors: pitColors}, scene);
    shipPit.material = pitMaterial;
    shipPit.rotate(BABYLON.Axis.X, positionExtrudeX, BABYLON.Space.LOCAL);
    shipPit.position.z = 2.5;

    // the wings ******************************************************************************************************
    const wing01 = BABYLON.MeshBuilder.ExtrudePolygon("wing01", {shape: wingShape, depth: 2, faceColors: bodyColors}, scene);
    wing01.material = bodyMaterial;
    wing01.position.z = 20;
    wing01.position.y = 5;
    wing01.position.x = -5;

    const wing02 = BABYLON.MeshBuilder.ExtrudePolygon("wing02", {shape: wingShape, depth: 2, faceColors: bodyColors}, scene);
    wing02.material = bodyMaterial;
    wing02.rotate(BABYLON.Axis.X, (.5 * Math.PI *2), BABYLON.Space.LOCAL);
    wing02.position.y = 3;
    wing02.position.x = -5;

    // The Weapon *****************************************************************************************
   let weaponBase; // weaponBase container
    const makeWeaponBase = ()=>{
        weaponBase = BABYLON.MeshBuilder.CreateBox("weaponBase", {height: 5, width: 5, depth: 5}, scene);
        weaponBase.material = weaponMat;
        weaponBase.position.y = 17;
        weaponBase.position.x = 15;
        weaponBase.position.z = 10;
    }
    // the Star
    const star = BABYLON.MeshBuilder.CreateSphere("star", {segments: 10, diameter: 100}, scene);
    star.material = starMat;
    star.position.x = -300;

    

    // The Transform Node
    const ship = new BABYLON.TransformNode("root");
    // set the node in the middle 
    ship.position.x = 10;
    shipPit.parent = ship;
    shipBody.parent = ship;
    wing01.parent = ship;
    wing02.parent = ship;

    // positioning
    ship.position.x = -10;
    ship.rotate(BABYLON.Axis.Y, (.25 * Math.PI * 2), BABYLON.Space.LOCAL);
    // The Star transform Node
    const starShip = new BABYLON.TransformNode("root");
    starShip.position.x = -300;
    ship.parent = starShip;
    ship.position.x = 300;

    
    
    // point the camera
    camera.lockedTarget = ship;    

    // ================================================== Actions/Functions  =====================================
    // function for movement
    
    
    // Event listener for key press
    scene.actionManager = new BABYLON.ActionManager(scene);
    // W >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> W
    // Variables for the ships movement
    const move ={
        speed: 0, // per second
        acceleration: 1,
        maxSpeed: 100,
    }
    
    var map ={}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);
   
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
          
    }));
      
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));	
    
    scene.registerBeforeRender(()=>{
        move.fps = engine.getFps();
        if (map["w"] || map["W"]) {
            console.log('in the w');
            if( move.speed < move.maxSpeed) {
                move.speed += move.acceleration;
                console.log(`w moveSpeed: ${move.speed}`);
            };
            if(move.speed > 0.15){
                move.speed -= 0.15;
            } else {
                move.speed = 0;
            };    
        } else if (map["s"] || map["S"]) {
            console.log('in the s');
            if(move.speed > (move.maxSpeed * -1)) {
                move.speed += (move.acceleration * -1);
                console.log(`s moveSpeed: ${move.speed}`);
            };
            if(move.speed < -0.15){
                move.speed += 0.15;
            } else {
                move.speed = 0;
            };
        }
        
        
        
        let distance = move.speed / move.fps;
        ship.position.y += distance;
    });



    return scene;
};

const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function (){
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", ()=>{
    engine.resize();
});