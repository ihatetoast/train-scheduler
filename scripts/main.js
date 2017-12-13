$(document).ready(function(){
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

    //moment and mathymagic variables:
    const currentTime = moment();
    let firstTrain = '';
    let freq = 0;
    let arrivalTime = 0;
    let waitTime = 0;
    let train;
    let first;
    let destination;
    let frequency;

  //const of cities because it would not really let people write just anything. 
  const texasCities = ["abilene", "allen", "amarillo", "arlington", "atascocita", "austin", "baytown", "beaumont","brownsville", "bryan", "carrollton", "cedar park","college station", "conroe", "corpus christi", "dallas", "denton", "desoto", "edinburg", "el paso", "euless", "fort worth", "galveston", "garland", "georgetown", "grand prairie", ,  "grapevine", "harlingen",  "houston", "irving", "katy", "killeen", "laredo", "league city", "longview", "lubbock", "mansfield", "mcallen", "mckinney", "mesquite", "midland", "mission",  "missouri city", "new braunfels", "odessa", "pasadena", "pflugerville", "plano",  "port arthur", "richardson", "round rock", "san angelo", "san antonio", "san marcos", "spring", "sugar land", "temple", "tyler", "victoria", "waco", "wichita falls"];
  
  // when the page loads, i want to pull data from firebase and populate my train schedule 
  //and when there's change
  //order by destination because that's what people would look up 
  //my story here is that this is seen in the main lobby of a train station

  //the math magic happens when i bring things down from the farhbase
    database.ref().orderByChild("destination").on("child_added", function(childsnap){
      const cs = childsnap.val();
      // console.log(`childsnap is ${childsnap.val()}`);
      freq = cs.frequency;
      firstTrain = cs.first;
      
      //first time changed to a year prior to ensure input is always after the first train. it's a hack!
      let firstTimeStatic = moment(firstTrain, "HHmm").subtract(1, "years");
      //difference between the first train time
      let diffTime = moment().diff(moment(firstTimeStatic),"minutes");
      let remainder = diffTime % freq;
      waitTime = freq - remainder;
      arrivalTime = moment().add(waitTime, "minutes");

      $("tbody").append(`
        <tr class="trainRow">
          <td class="titleCase">${childsnap.val().train}</td>
          <td class="titleCase">${childsnap.val().destination}</td>
          <td>${freq}</td>
          <td>${moment(arrivalTime).format("HH:mm")}</td>
          <td class="waitTime">${waitTime} minutes</td>
        </tr>
      `);
      console.log();
    });
  $("tbody").on("click",".trainRow", function(){
    console.log(this);
  });
  database.ref().on("child_removed", function(snapshot) {
    var deletedPost = snapshot.val();
    console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
  });
    //style minutes. if it's within 5 minutes, scare the shit out of those waiting on the platform checking their facie.
    
  // i want to capture train information on when i submit a Form 
  // i want the form to clear on submit
  // i want to cancel if needed and clear the form

  //Code this app to calculate when the next train will arrive; this should be relative to the current time.
  console.log(currentTime);
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  
  //train runs every x minutes (freq) 
  //need to know when next train arrives from now. will need a first train time. 

  // on submit, i want to send the captured data to the databas and have that add to the schedule.$
//TAs: 
/*I don't really know how to do the form validation library, so I am making it up. I'd like to do something where they get the warning off focus, but it's a battle of time I have to get this done and time I have to break everything with the validator and then to fix it.*/
  $("#submit").click((e)=>{
    e.preventDefault();
    //input vals
    train = $("#train").val().trim();
    first = $("#first").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();

    //only military time, which no feckin departure board uses
    if( !(/^([0-9]|0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/.test($("#first").val().trim())) ){
      alert('Please use the military time format: hhmm.');
    }
     //no empty fields 
    else if ( ($("#train").val().trim()== '') || ($("#train").val().trim()== null) || ($("#destination").val().trim()== '') || ($("#destination").val().trim()== null) || ($("#frequency").val().trim()== '') || ($("#frequency").val().trim()== null) ){
      alert('No empty values, please.');
    }
    //must be in the list 
    else if(texasCities.indexOf(destination.toLowerCase())==-1){
      alert('That city is not serviced by FART.');
    }
    else{
      const formData = {
        train,
        first,
        destination,
        frequency
      }
      console.log(`train line: ${formData.train}`);
      console.log(`first train departs at: ${formData.first}`);
      console.log(`frequency of train: ${formData.frequency}`);
      database.ref().push(formData);
      //clear after submit
      $('input').val('');
      console.log(formData);
    }
  });

    $("#cancel").click(()=>{
    $("#train").val('');
    $("#first").val('');
    $("#destination").val('');
    $("#frequency").val('');
  });
  // database.ref.child(key).remove();
  
  

  // i want to use momentjs to figure out when the next train is due to depart. 
  // as is, the assignment asks us to determine frequency and when it's due in next. 
  //cal minutes to next departure. mmaybe have it turn a diff color when within a certain time
  
  //AIzaSyDOG9FkZgCmzcqxgZFGqL10GM0f96lRsec
  
  // if i get that done, try to make it full CRAP: create read adjust and purge. i crack myself PaymentRequestUpdateEvent.
  });