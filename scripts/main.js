$(document).ready(function(){
  console.log("if you see this, i dun did load.");

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCQI7rNAFEy_rWJ6QTEMBx9OwwS31JSxRY",
      authDomain: "fir-austin-rapit-transit.firebaseapp.com",
      databaseURL: "https://fir-austin-rapit-transit.firebaseio.com",
      projectId: "fir-austin-rapit-transit",
      storageBucket: "fir-austin-rapit-transit.appspot.com",
      messagingSenderId: "491380894325"
    };
    firebase.initializeApp(config);

    //database variables:
    const database = firebase.database();
    

  // when the page loads, i want to pull data from firebase and populate my train schedule 
  //and when there's change
  //order by destination because that's what people would look up 
  //my story here is that this is seen in the main lobby of a train station
    database.ref().orderByChild("destination").on("child_added", function(childsnap){
      console.log(childsnap.val());
      $("tbody").append(`
        <tr>
          <td>${childsnap.val().train}</td>
          <td>${childsnap.val().first}</td>
          <td>${childsnap.val().destination}</td>
          <td>${childsnap.val().frequency}</td>
          <td>fake time</td>
          <td>fake min left</td>
        </tr>
      `)
    })
  

  // i want to capture train information on when i submit a Form 
  // i want the form to clear on submit
  // i want to cancel if needed and clear the form

  //Code this app to calculate when the next train will arrive; this should be relative to the current time.
  console.log(moment());
  const currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // regex for 24h: 
  // console.log(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test('23:18'));
  
  //train runs every x minutes (freq) 
  //need to know when next train arrives from now. will need a first train time. 

  // on submit, i want to send the captured data to the databas and have that add to the schedule.$
  let alertMessages = [];
  $("#submit").click((e)=>{
    e.preventDefault();
    if( !(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test($("#first").val().trim())) ){
      alert('Please use the 24-hour format.');
    } else if ( ($("#train").val().trim()== '') || ($("#train").val().trim()== null) || ($("#destination").val().trim()== '') || ($("#destination").val().trim()== null) || ($("#frequency").val().trim()== '') || ($("#frequency").val().trim()== null) ){
      alert('No empty values, please.');
    }    
    else{
    
      const formData = {
        train: $("#train").val().trim(),
        first: $("#first").val().trim(),
        destination: $("#destination").val().trim(),
        frequency: $("#frequency").val().trim(),
      }
      database.ref().push(formData);
      $("#train").val('');
      $("#first").val('');
      $("#destination").val('');
      $("#frequency").val('');
      console.log(formData);
  }
  });

  $("#cancel").click(()=>{
    $("#train").val('');
    $("#first").val('');
    $("#destination").val('');
    $("#frequency").val('');
  });
  

  // i want to use momentjs to figure out when the next train is due to depart. 
  // as is, the assignment asks us to determine frequency and when it's due in next. 
  //cal minutes to next departure. mmaybe have it turn a diff color when within a certain time
  
  //AIzaSyDOG9FkZgCmzcqxgZFGqL10GM0f96lRsec
  
  // if i get that done, try to make it full CRAP: create read adjust and purge. i crack myself PaymentRequestUpdateEvent.
  });