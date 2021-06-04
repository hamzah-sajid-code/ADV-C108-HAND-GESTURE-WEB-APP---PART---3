Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#camera')

function take_selfie(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img src="'+data_uri+'" id="img_capture">';
    })
}
console.log('ML5 Version: '+ml5.version);
classfier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/KBYtIkPG1/model.json', modelLoaded);
function modelLoaded(){
    console.log('Successfully Loaded the model')
}
function speak(prediction_1){
    var synth = window.speechSynthesis;

    prediction_1_data = "You are making "+prediction_1+" gesture";
    var utter = new SpeechSynthesisUtterance(prediction_1_data);
    synth.speak(utter);
}
function result(){
    img = document.getElementById('img_capture');
    classfier.classify(img, gotit);
}
function gotit(error, results){
    if(error){
        console.error(error);
    }
    console.log(results[0].label);
    speak(results[0].label)
    if(results[0].label == 'Yo'){
        document.getElementById('pre_oneName').innerHTML = 'Yo';
        document.getElementById('pre_oneEmoji').innerHTML = '&#129304;';
    }
    if(results[0].label == 'Raised Fist'){
        document.getElementById('pre_oneName').innerHTML = 'Raised Fist';
        document.getElementById('pre_oneEmoji').innerHTML = '&#9994;';
    }
    if(results[0].label == 'Victory'){
        document.getElementById('pre_oneName').innerHTML = 'Victory';
        document.getElementById('pre_oneEmoji').innerHTML = '&#9996;';
    }
    if(results[0].label == 'Thumbs Up'){
        document.getElementById('pre_oneName').innerHTML = 'Thumbs Up';
        document.getElementById('pre_oneEmoji').innerHTML = '&#128077;';
    }
    if(results[0].label == 'Excellant'){
        document.getElementById('pre_oneName').innerHTML = 'Excellant';
        document.getElementById('pre_oneEmoji').innerHTML = '&#128076;';
    }
}