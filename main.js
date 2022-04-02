songHappier = "";
songHappierStatus = "";
songBeKind = "";
songBeKindStatus = "";
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    songHappier = loadSound("Happier.mp3");
    songBeKind = loadSound("BeKind.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded Successfully");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("%cLeft Wrist X: " + leftWristX + "; Left Wrist Y: " + leftWristY, "color: hsl(197, 90%, 50%); font-weight: bold;");

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("%cLeft Wrist Score: " + leftWristScore, "color: red; font-weight: bold;");

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("%cRight Wrist X: " + rightWristX + "; Right Wrist Y: " + rightWristY, "color: lime; font-weight: bold;");
    }
}

function draw() {
    image(video, 0, 0, 600, 450);

    stroke("red");
    fill("red");
    songHappierStatus = songHappier.isPlaying();
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 30);
        songHappier.stop();
        if (songHappierStatus == false) {
            songHappier.play();
            songHappier.setVolume(.1); // if there is full volume, the song is way too loud

            document.getElementById("songLabel").innerHTML = "Song Name: Happier";
            console.log("%cPlaying: Happier", "color: gold; font-weight: bold;")
            // the song has a bit of delay at the beginning so wait for a few seconds :)
        }
    }
}