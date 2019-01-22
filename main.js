const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
 
// add the create scene function
const createScene = () => {
    // create the scene space
    const scene = new BABYLON.Scene(engine);

    //Arc Camera to just uncomment so you can easily rotate camera to edit
    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera("Camera", -.4 *Math.PI *2 , Math.PI/3, 100, new BABYLON.Vector3(0, 0, 0), scene);
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    // Add this camera to fix the position
    // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene);    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    // camera.radius = 60;
    // camera.heightOffset = 30;
    // camera.rotationOffset = 30;
    scene.ambientColor = new BABYLON.Color3(.75, .75, .75);

    // Add lights to the scene
    const light1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(30, 30, 1), scene);
    light1.diffuse = new BABYLON.Color3(0, 0, 1);
	light1.specular = new BABYLON.Color3(0, 0, 1);
	light1.groundColor = new BABYLON.Color3(0, 1, 0);
 

    /************Start Pilot*********************************/
    var body = BABYLON.MeshBuilder.CreateCylinder("body", { height: 0.75, diameterTop: 0.2, diameterBottom: 0.5, tessellation: 6, subdivisions: 1 }, scene);
    var arm = BABYLON.MeshBuilder.CreateBox("arm", { height: 0.75, width: 0.3, depth: 0.1875 }, scene);
    arm.position.x = 0.125;
    var pilot = BABYLON.Mesh.MergeMeshes([body, arm], true);

    var localOrigin = localAxes(2);
    localOrigin.parent = pilot;
    /*************End Pilot****************************************/

//#####################BABYLON 101 DEMO CODE POSITION###################

    pilot.position = new BABYLON.Vector3(2, 2, 8);

//#############################################################

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

    showAxis(8);

    /*******************************Local Axes****************************/
    function localAxes(size) {
        var pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
        pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

        pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ], scene);
        pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

        var pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ], scene);
        pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);

        var local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", { size: 1 }, scene);
        local_origin.isVisible = false;

        pilot_local_axisX.parent = local_origin;
        pilot_local_axisY.parent = local_origin;
        pilot_local_axisZ.parent = local_origin;

        return local_origin;

    }
    /*******************************End Local Axes****************************/

    const bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
    bodyMaterial.ambientColor = new BABYLON.Color3(1, .25, .25);
    bodyMaterial.backFaceCulling = false;

    const pitMaterial = new BABYLON.StandardMaterial("pitMaterial", scene);
    pitMaterial.ambientColor = new BABYLON.Color3(.25, .25, 1);
    //pitMaterial.emissiveColor = new BABYLON.Color3(0, 0, 1);
    //bodyMaterial.backFaceCulling = false;

    const ghostMat = new BABYLON.StandardMaterial("ghostMat", scene);
    ghostMat.ambientColor = new BABYLON.Color4(0, 0, 0,);

    const lightMat = new BABYLON.StandardMaterial("lightMat", scene);
    lightMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

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
        new BABYLON.Color4(1, 0.25, 0.25, 1),
        new BABYLON.Color4(1, 0.25, 0.25, 1),
        new BABYLON.Color4(1, 0.25, 0.25, 1),
    ];

    var yaw = Math.random() * 2* Math.PI;
	var pitch = Math.random() * 2* Math.PI;
    const roll =  .75 * 2* Math.PI;
    // a vector zero object to use so the camera fixates and follows vector 0, 0, 0
    const camTarget = BABYLON.MeshBuilder.CreateSphere("camTarget", {diamter: 1}, scene);
    camTarget.material = ghostMat;
    // the Background Planes **********************************************************************************************
    const wallRight = BABYLON.MeshBuilder.CreatePlane("wallRight", {width: 100, height: 100}, scene);
    wallRight.rotate(BABYLON.Axis.Y, (.25 * Math.PI *2), BABYLON.Space.LOCAL);
    wallRight.position.x = 50;
    wallRight.position.y = 25;
    wallRight.position.z = 15;

    const wallLeft = BABYLON.MeshBuilder.CreatePlane("wallRight", {width: 100, height: 100}, scene);
    wallLeft.rotate(BABYLON.Axis.Y, (1 * Math.PI *2), BABYLON.Space.LOCAL);
    wallLeft.position.x = 0;
    wallLeft.position.y = 25;
    wallLeft.position.z = 65;

    // The Ground ********************************************************************************************************
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 100, height: 100}, scene);
    ground.position.y = -25;
    ground.position.z = 15;
    // the lightbulb ******************************************************************************************************
    const lightBulb = BABYLON.MeshBuilder.CreateSphere("lightBulb", {diameter: 2}, scene);
    lightBulb.material = lightMat;
    lightBulb.position.y = 30;
    lightBulb.position.x = 30;
    lightBulb.position.z = 1;

    // the ship body **************************************************************************************************
    const shipBody = BABYLON.MeshBuilder.ExtrudePolygon("shipBody", {shape: bodyShape, depth: 20, faceColors: bodyColors}, scene);
    shipBody.material = bodyMaterial;
    shipBody.rotate(BABYLON.Axis.X, roll, BABYLON.Space.LOCAL);

    //the cockpit *********************************************************************************************
    const shipPit = BABYLON.MeshBuilder.ExtrudePolygon("shipPit", {shape: pitShape, depth: 15, faceColors: pitColors}, scene);
    shipPit.material = pitMaterial;
    shipPit.rotate(BABYLON.Axis.X, roll, BABYLON.Space.LOCAL);
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

    const CoT = new BABYLON.TransformNode("root"); 
    shipPit.parent = CoT;
    shipBody.parent = CoT;
    wing01.parent = CoT;
    wing02.parent = CoT;

    camera.lockedTarget = camTarget;

    var animationShip = new BABYLON.Animation("myAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // An array with all animation keys
var keys = []; 
//At the animation key 0, the value of position is "1"
    keys.push({
        frame: 0,
        value: 0
    });
    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 50,
        value: 2
    });
    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 55,
        value: 2
    });
    keys.push({
        frame: 100,
        value: 0
    })
   

animationShip.setKeys(keys);

CoT.animations = [];
CoT.animations.push(animationShip);
scene.beginAnimation(CoT, 0, 100, true);

scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
camera.applyGravity = true;

    return scene;
};
// call the create scene function
const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function (){
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", ()=>{
    engine.resize();
});