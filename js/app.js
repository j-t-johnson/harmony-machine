//////////////////////////////////////////////////////////////////////////////
//// jacob johnson   /////////////////////////////////////////////////////////
//// ep 491          /////////////////////////////////////////////////////////
//// harmony machine /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//list of all types in the bank
var chordTypes = ["iMaj", "iiMin", "iiiMin", "ivMaj", "vMaj", "viMin", "viiDim",
                  "vOf2", "vOf3", "vOf4", "vOf5", "vOf6",
                  "ivMin", "biiMaj", "biiiMaj", "bviMaj", "bviiMaj"];

//list of all inversions in the bank
var chordInversions = ["r3", "f3", "s3"];

var chordScales = [[0, 2, 4, 5, 7, 9, 11],
                   [0, 2, 3, 5, 7, 9, 10],
                   [0, 1, 3, 5, 7, 8, 10],
                   [0, 2, 4, 6, 7, 9, 11],
                   [0, 2, 4, 5, 7, 9, 10],
                   [0, 2, 3, 5, 7, 8, 10],
                   [0, 1, 3, 5, 6, 8, 10]];

//define voicings by pitch class relative to do/0
var chordBank = {

    //diatonic
    iMaj : {
        r3 :[0, 4, 7],
        f3 :[4, 7, 12],
        s3 :[7, 12, 16]
    },
    iiMin : {
        r3 :[2, 5, 9],
        f3 :[5, 9, 14],
        s3 :[9, 14, 17]
    },
    iiiMin : {
        r3 :[4, 7, 11],
        f3 :[7, 11, 16],
        s3 :[11, 16, 19]
    },
    ivMaj : {
        r3 :[5, 9, 12],
        f3 :[9, 12, 17],
        s3 :[0, 5, 9]
    },
    vMaj : {
        r3 :[7, 11, 5],
        f3 :[11, 5, 7],
        s3 :[5, 7, 11]
    },
    viMin : {
        r3 :[9, 12, 16],
        f3 :[0, 4, 9],
        s3 :[4, 9, 12]
    },
    viiDim : {
        r3 :[11, 14, 17],
        f3 :[2, 5, 11],
        s3 :[5, 11, 14]
    },

    //s3ary doms
    vOf2 : {
        r3 :[9, 13, 7],
        f3 :[1, 4, 9],
        s3 :[4, 9, 13]
    },
    vOf3 : {
        r3 :[11, 15, 9],
        f3 :[3, 6, 11],
        s3 :[6, 11, 15]
    },
    vOf4 : {
        r3 :[0, 4, 10],
        f3 :[4, 7, 12],
        s3 :[7, 12, 16]
    },
    vOf5 : {
        r3 :[2, 6, 12],
        f3 :[8, 11, 16],
        s3 :[11, 16, 20]
    },
    vOf6 : {
        r3 :[4, 8, 14],
        f3 :[10, 13, 18],
        s3 :[1, 6, 10]
    },

    //4 minor
    ivMin : {
        r3 :[5, 8, 12],
        f3 :[8, 12, 17],
        s3 :[0, 5, 8]
    },

    //b2, b3, b6, b7 modal interchange
    biiMaj : {
        r3 :[1, 5, 8],
        f3 :[5, 8, 13],
        s3 :[8, 13, 17]
    },
    biiiMaj : {
        r3 :[3, 7, 10],
        f3 :[7, 10, 15],
        s3 :[10, 15, 19]
    },
    bviMaj : {
        r3 :[8, 12, 15],
        f3 :[0, 3, 8],
        s3 :[3, 8, 12]
    },
    bviiMaj : {
        r3 :[10, 14, 17],
        f3 :[2, 5, 10],
        s3 :[5, 10, 14]
    }
};

//chord change weights
//              1    2    3    4    5    6    7    5/2  5/3  5/4  5/5  5/6  4m   b2   b3   b6   b7
var weights = [[0,   0,   0,   0,   0,   0,   0,   0.7, 0,   0,   0,   0,   0,   0,   0.3, 0,   0],
/*1 2*/        [0,   0,   0,   0,   0.5, 0,   0,   0,   0,   0,   0,   0,   0,   0.2, 0,   0,   0.3],
/*2 3*/        [0,   0.3, 0,   0.2, 0,   0,   0,   0,   0,   0,   0.5, 0,   0,   0,   0,   0,   0],
/*3 4*/        [0,   0,   0,   0,   0.3, 0,   0,   0,   0,   0,   0,   0,   0.4, 0,   0,   0,   0.3],
/*4 5*/        [0.4, 0,   0.3, 0,   0,   0.3, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*5 6*/        [0,   0.2, 0,   0.2, 0,   0,   0,   0.2, 0,   0.2, 0,   0,   0,   0,   0.2, 0,   0],
/*6 7*/        [0.5, 0,   0.1, 0,   0,   0.2, 0,   0,   0,   0.2, 0,   0,   0,   0,   0,   0,   0],
/*7 5/2*/      [0,   0.4, 0,   0.2, 0,   0,   0,   0,   0,   0,   0.2, 0,   0,   0,   0,   0.2, 0],
/*8 5/3*/      [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*9 5/4*/      [0,   0.2, 0,   0.4, 0.2, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0.2, 0],
/*10 5/5*/     [0,   0,   0,   0,   0.8, 0,   0.2, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*11 5/6*/     [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*12 4m*/      [1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*13 b2*/      [1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
/*14 b3*/      [0,   0.4, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0.6, 0],
/*15 b6*/      [0,   0,   0,   0,   0.5, 0,   0,   0,   0,   0,   0,   0,   0,   0.5, 0,   0,   0],
/*16 b7*/      [1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0]];

var chord = [];
var bassNote;
var currentChord = "";
var currentInversion = chordInversions[0];
var currentIndex = 16; //start with b2 to cause tonic first

var chosenChords = [];

var allChords = [];

// solfege "doe" because "do" is reserved for loops
var doe;
//display purposes only
var pitchClasses = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E",
                    "F", "F#/Gb", "G", "G#/Ab"];

var transState = 0;
var paramIndex = 0;
var rhythmFactor;

var poly, bongo, bass;
var filterLFO, polyFilter, bassFilter;
var bongoDelay, bongoWetPan, bongoDryPan, bongoGain1, bongoGain2;
var verb, dry, wet;

var polyScale = 0;
var fmScale = 0;

//////////////////////////////////////////////////////////////////////////////

// "loadbang"
window.onload = function(){

    //transport init
    Tone.Transport.loopEnd = '6m';
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 100;

    Tone.Transport.bpm.value = parseInt(document.getElementById("tSlider").value);
    document.getElementById("tempoDisplay").innerHTML = "tempo :" + (Tone.Transport.bpm.value).toFixed(0) + " bpm";

    //get tonal center
    doe = parseFloat(document.getElementById('centerDo').value);
    document.getElementById("pitchClass").innerHTML = "tonal center: " + pitchClasses[(doe - 45)];

    //get rhythmic density
    rhythmFactor = parseFloat(document.getElementById("rSlider").value);

    // for (var i = 0; i < 16; i++) {
    //     chosenChords[i] = new ChordChoice();
    //     chosenChords[i].button = document.getElementById("c"+i);
    //     chosenChords[i].button.value = chordTypes[i];
    //     console.log(chosenChords[i].button);
    //     chosenChords[i].button.addEventListener("click", function() {
    //         if (chosenChords[i].state == 1) {
    //             chosenChords[i].state = 0;
    //             chosenChords[i].opacity = "0.1";
    //         } else {
    //             chosenChords[i].state = 1;
    //             chosenChords[i].opacity = "0.8";
    //         }
    //         chosenChords[i].button.style.opacity = chosenChords[i].opacity;
    //     });
    // }


    //voices
    ///////////////////////////////////////////////////
    //poly synth
    poly = new Tone.PolySynth(3, Tone.FMSynth);
    poly.set({
        "harmonicity" : 3,
        "modulationIndex" : 50,
        "modulation" : {
            "type" : "sine",
        },
        "oscillator" : {
            "type" : "sine",
        },
        "envelope" : {
            "attack" : 6,
            "decay" : 6,
            "sustain" : 0.7,
            "release" : 10,
            "releaseCurve" : "linear"
        },
        "modulationEnvelope" : {
            "attack" : 6,
            "decay" : 6,
            "sustain" : 0.4,
            "release" : 10,
            "releaseCurve" : "linear"
        }
    });

    //bongo
    bongo1 = new Tone.MembraneSynth({
        "volume" : -6,
        "pitchDecay" : 0.007,
        "octaves" : 5
    });

    bongo2 = new Tone.MembraneSynth({
        "volume" : -6,
        "pitchDecay" : 0.007,
        "octaves" : 5
    });

    bongoGain1 = new Tone.Gain;
    bongoGain2 = new Tone.Gain;

    bongoDryPan = new Tone.Panner(-0.75);
    bongoWetPan = new Tone.Panner(0.75);
    bongoDelay = new Tone.FeedbackDelay("4n", 0);
    bongoDelay.wet = 1;
    bongoWetPan.connect(bongoDelay);

    //bass
    bass = new Tone.Synth({
        "volume" : 2,
        "oscillator" : {
            "type" : "fatsawtooth"
        },
        "envelope" : {
            "attack" : 6,
            "decay" : 6,
            "sustain" : 0.7,
            "release" : 10,
            "releaseCurve" : "linear"
        }
    });

    //low freq o
    filterLFO = new Tone.LFO("4n+8n", 700, 700);

    //filters
    polyFilter = new Tone.Filter(100, "lowpass", -48);
    polyFilter.Q.value = 2;
    bassFilter = new Tone.Filter(300, "lowpass", -24);
    bassFilter.Q.value = 2;

    //verb
    verb = new Tone.Convolver("./ir/1a_marble_hall.wav");
    verb.wet = 1;

    //mix
    dry = new Tone.Gain().toMaster();
    wet = new Tone.Gain(0.5).toMaster();

    //connections
    // filterLFO.connect(polyFilter.frequency);
    // filterLFO.start();

    poly.connect(polyFilter);
    bass.connect(bassFilter);

    bongo1.connect(bongoGain1);
    bongo2.connect(bongoGain2);


    bongoGain1.connect(bongoDryPan);
    bongoGain1.connect(bongoWetPan);
    bongoGain2.connect(bongoDryPan);
    bongoGain2.connect(bongoWetPan);

    bongoDryPan.connect(dry);
    bongoDelay.connect(dry);
    bongoDryPan.connect(verb);
    bongoDelay.connect(verb);

    polyFilter.connect(verb);
    polyFilter.connect(dry);

    bassFilter.connect(verb);
    bassFilter.connect(dry);

    verb.connect(wet);

    var paramButton = document.getElementById('paramSel');
    paramButton.addEventListener("input", function() {
        paramIndex = paramButton.selectedIndex;
    });

    var playButton = document.getElementById("playButton");
    playButton.addEventListener("click", function() {
        if (transState == 0) {
            transState = 1;
            Tone.Transport.start('+0.1');
            Tone.Master.volume.value = -16;
            playButton.value = "stop";
            startEnvs();
        } else if (transState == 1) {
            transState = 0;
            stopEnvs();
            Tone.Transport.stop("+0.1");
            Tone.Master.volume.value = -160;
            playButton.value = "start";
            currentIndex = 16;
        }
    });
}

//////////////////////////////////////////////////////////////////////////////
//spiky ball inspired by:
//  https://codepen.io/kulturdesign/pen/wKQNNX

/*
/* color palette:
/*		dark teal:
/*			(62,97,106);
/*		sky blue:
/*			(137, 213, 234);
/*		pale periwinkle:
/*			(210, 231, 237);
/*		grey:
/*			(94, 104, 106);
/*		mellow blue:
/*			(110, 170, 187);
/*
/*/

// rotation
var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;

var spikeMult = 0.1;
var sphereRad = 1;

var mouseWinY, mouseWinX;

var spawn = [];
var satellites = [];
var spawnSize, spawnColor;
var spawnJitter = 10;
var wow = 1;
var bloom;
var thingo;


function setup() {
   createCanvas(windowWidth, windowHeight, WEBGL);
   frameRate(15);

   for (var i = 0; i < 150; i++) {
       spawn.push(new Newbee());

   }
   for (var i = 0; i < 60; i++) {
        satellites.push(new Ring());
   }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    thingo = Math.floor(((rhythmFactor*2)+1)*10);
    background("#D2E7ED");
    doAnimate();
    objRotate();
    drawModel();
    for (var i = 0; i < thingo; i++) {
        satellites[i].draw(i);
    }
    // drawBox();
    for (var i = 0; i < spawn.length; i++) {
        spawn[i].draw();
    }
}

function drawModel() {
    var spikeCount = 150;
    var spikeMaxLen = height * spikeMult;
    var groupRadius = (((height/2) - (height/10)) * sphereRad);

    for (var s=0; s < spikeCount; s++) {

        var noiseCoord = s;
        var rnd = lerp(-1,1,noise(noiseCoord));

        // translate
        rotateY(PI*rnd);
        rotateZ(PI*rnd);
        translate(groupRadius,0,0);

        stroke('#89D5EA');
        plane(rnd * spikeMaxLen,0.5);

        //reset translation
        translate(-groupRadius,0,0);
        rotateY(-(PI*rnd));
        rotateZ(-(PI*rnd));
    }
}

function doAnimate() {
    // increment animation variables
    if (transState == 1) {
        rotationX -= 0.3;
        rotationY -= 0.3;
        rotationZ -= 0.3;
    }
}

function objRotate() {
    rotateX(radians(rotationX));
    rotateY(radians(rotationY));
    rotateZ(radians(rotationZ));
}

function drawBox() {
    fill(94, 104, 106, 20);
    stroke('#3E616A');
    box(140);
}

function Newbee() {

    this.draw = function() {
        var randX = rand(-spawnJitter, spawnJitter);
        var randY = rand(-spawnJitter, spawnJitter);
        var randZ = rand(-spawnJitter, spawnJitter);

        noStroke();
        fill(110 * spawnColor, 170 * spawnColor, 187 * spawnColor, 10);

        translate(randX, randY, randZ);
        sphere(spawnSize);
        translate(-randX, -randY, -randZ);
    }
}

function Ring(){
    this.draw = function(i) {

        var iToRadians = ((TWO_PI)*(i))/thingo;

        fill(92,127,136, bloom);
        stroke(107, 173, 204, 50);
        translate(cos(iToRadians) * (200*wow), sin(iToRadians) * (200), 0);
        rotate((i*10));
        sphere(rand(10, 15), 2, 2);
        rotate((-i*10));
        translate(-cos(iToRadians) * (200*wow), -sin(iToRadians) * (200), 0);

    }
}

function mouseDragged() {
    if (mouseY > windowHeight* 0.15 && mouseY < windowHeight) {
        if (mouseX > 0 && mouseX < windowWidth) {
        mouseWinY =  1 - (mouseY/windowHeight);
        mouseWinX = (mouseX/windowWidth);

        switch (paramIndex) {
            case 1:
                bassFilter.frequency.value = mouseWinY * 3000;
                bassFilter.Q.value = mouseWinX * 10;
                bass.detune.value = mouseWinX * 25;
                spawnJitter = (36 * mouseWinY) + (spawnSize / 5);
                spawnColor = mouseWinY + 0.5;
                spawnSize = (mouseWinX * 20) + 20;
                break;
            case 2:
                bongo1.pitchDecay = mouseWinY * 0.05;
                bongo1.octaves = Math.floor(mouseWinX * 4) + 1;
                bongo2.pitchDecay = mouseWinY * 0.05;
                bongo2.octaves = Math.floor(mouseWinX * 4) + 1;

                wow = (mouseWinX+1) * 0.5;
                bloom = ((mouseWinY*180));

                break;
            default:
                sphereRad = mouseWinX;
                spikeMult = mouseWinY * 0.5;

                polyScale = mouseWinY * 3000;

                poly.volume.value = -1 * 20 * (1 - mouseWinX);
                polyFilter.frequency.value = polyScale;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////

//pick new chord
function newChord() {
     var validWeight = [0];
     var validChords =[];

     //strip 0 weights and grab their index
     for (var i = 0; i < weights[currentIndex].length; i++) {
         if (weights[currentIndex][i] > 0) {
             validWeight.push(weights[currentIndex][i]);
             validChords.push(i);
         }
     }

     //setup for random comp
     for (var i = 0; i < validWeight.length; i++) {
         if ([i] > 0) {
              validWeight[i] = (validWeight[i] + validWeight[i-1]);
         }
     }

     var val = Math.random();

     //determine chord
     for (var i = 0; i < validWeight.length; i++) {
         if (val > validWeight[i] && (validWeight[i+1]) > val) {
             currentChord = chordTypes[validChords[i]];
             currentIndex = validChords[i];
         }
     }
     //only show 8 chords
     if (allChords.length < 8) {
         allChords.push(" " + currentChord);
     } else {
         allChords.shift();
         allChords.push(" " + currentChord);
     }
     document.getElementById("allchords").innerHTML = allChords;
}

function determineBassNote(){
    if (doe > 50) {
        bassNote = 0.25 * chord[0];
    } else {
        bassNote = 0.5 * chord[0];
    }
}


//poly/bass trigger function
function triggerPoly(time) {

    newChord(weights[currentIndex]);
    for (var i = 0; i < chordBank[currentChord][currentInversion].length; i++) {
        chord[i] = mtof(chordBank[currentChord][currentInversion][i] + doe);
    }
    poly.triggerAttackRelease(chord, "3m", time);
    determineBassNote();
    bass.triggerAttackRelease(bassNote, "3m", time);
};


function playBongos(){

    var bongoRhythm1 = ["0:0", "0:1:2", "0:2:2", "0:3", "1:0", "1:0:1", "1:0:3", "1:1:2",
                       "1:2", "1:2:3", "1:3:2", "1:3:3"];

    var bongoRhythm2 = ["0:0", "0:3", "1:0", "1:2"];


    var bongoPart1 = new Tone.Part(function(time, note){
        bongo1.triggerAttackRelease(chord[rand(0, chord.length-1)], "16n", time);
    }, bongoRhythm1);

    var bongoPart2 = new Tone.Part(function(time, note){
        bongo2.triggerAttackRelease(chord[rand(0, chord.length-1)], "16n", time);
    }, bongoRhythm2);

    bongoPart1.loop = true;
    bongoPart1.loopEnd = "2m";
    bongoPart1.start(0);

    bongoPart2.loop = true;
    bongoPart2.loopEnd = "2m";
    bongoPart2.start(0);
}

// midi to frequency conversion
function mtof(inputNote) {
    return Math.pow(2, (inputNote - 69)/12) * 432;
};

//init envelopes
function startEnvs() {
    poly.set({
        "envelope" : {
            "release" : 10,
        }
    });
    bass.set({
        "envelope" : {
            "release" : 10,
        }
    });
}

//quick stop when transport stops
function stopEnvs() {
    poly.set({
        "envelope" : {
            "release" : 0.5,
        }
    });
    poly.triggerRelease(chord, "16n");
    bass.set({
        "envelope" : {
            "release" : 0.5,
        }
    });
    bass.triggerRelease(0.5 * chord[0], "16n");
}

//actually calling and scheduling more than just tempo
var tempoCall = new Tone.Loop(function(time){

    //get bpm
    Tone.Transport.bpm.value = parseInt(document.getElementById("tSlider").value);
    document.getElementById("tempoDisplay").innerHTML = "tempo :" + (Tone.Transport.bpm.value).toFixed(0) + " bpm";

    //get tonal center
    doe = parseFloat(document.getElementById('centerDo').value);
    document.getElementById("pitchClass").innerHTML = "tonal center: " + pitchClasses[(doe - 45)];

    //get rhythmic density
    rhythmFactor = parseFloat(document.getElementById("rSlider").value);

    bongoGain1.gain.value = Math.sin(rhythmFactor);
    bongoGain2.gain.value = Math.sin(1-rhythmFactor);

    bongoDelay.delayTime.value = "4n";

}, "16n");

//////////////////////////////////////////////////////////////////////////////

//inclusive random
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min +1)) + min;
}


function ChordChoice() {
    this.state = 1;
    this.button;
    this.opacity = "0.8";
}

//////

tempoCall.start(0);
Tone.Transport.schedule(triggerPoly, 0);
Tone.Transport.schedule(playBongos, 0);
