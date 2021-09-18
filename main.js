Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img src="+data_uri+" id='captured_image'>";
});
}

console.log("ml5 version: ", ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5zWeQ01ZS/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function identify_image(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("name_of_object").innerHTML=results[0].label;
        document.getElementById("accuracy_of_object").innerHTML=results[0].confidence.toFixed(3);
    }
}