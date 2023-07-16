const firebaseConfig = {
  apiKey: "AIzaSyAm9xamE48qpYRMaxFgY8q1KDN5W7r3bSM",
  authDomain: "upload-d3e84.firebaseapp.com",
  databaseURL: "https://upload-d3e84-default-rtdb.firebaseio.com",
  projectId: "upload-d3e84",
  storageBucket: "upload-d3e84.appspot.com",
  messagingSenderId: "344793746541",
  appId: "1:344793746541:web:009c85e962f75c2140c364",
  measurementId: "G-L9EWJY54GS",
};

firebase.initializeApp(firebaseConfig);

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];

  var reader = new FileReader();
  reader.onload = function (event) {
    var vttString = event.target.result;

    var database = firebase.database();
    var vttRef = database.ref("user");
    vttRef
      .set({
        file: vttString,
      })
      .then(function () {
        console.log("VTT file uploaded successfully.");
      })
      .catch(function (error) {
        console.error("Error uploading VTT file:", error);
      });
  };

  reader.readAsText(file);
});
var videoPlayer;
var database = firebase.database();
var imageUrlRef = database.ref("user");

imageUrlRef.on("value", function (snapshot) {
  var videoplayer = document.getElementById("imageElement");
  videoplayer.src = snapshot.val().imageUrl;
  var subtitle = document.getElementById("subtitleTrack");
  subtitle.src = snapshot.val().file;
  const subtitleTrack = document.createElement("track");
  subtitleTrack.kind = "subtitles";
  subtitleTrack.src = subtitle;
  subtitleTrack.subtitleTrack.srclang = "en";
  subtitleTrack.label = "English";
  videoPlayer.appendChild(subtitleTrack);
});
