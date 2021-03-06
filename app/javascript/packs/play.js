document.addEventListener('DOMContentLoaded',function() {
  if (document.querySelector('h1')){
    const h1 = document.querySelector('h1').textContent
    if( h1 === 'publisher' ){
      initializeSessionP()
    }else if( h1 === 'subscriber'){
      initializeSessionS()
    }
  }else{
    return
  }
})


function initializeSessionP() {
  const hosts = window.location.origin
  const room_number = window.location.pathname.split('/')[2]
  fetch(`${hosts}/rooms/${room_number}/play.json`)
  .then(response => response.json())
  .then(result => {
    const token = result[0]
    const apiKey = result[1]
    const sessionId = result[2]
    var pubOptions = {videoSource: null};
    // Replace replacementElementId with the ID of the DOM element to replace:
    var session = OT.initSession(apiKey, sessionId);
    // Create a publisher
    var publisher = OT.initPublisher('publisher', pubOptions);

    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  })
}

function initializeSessionS() {
  const hosts = window.location.origin
  const room_number = window.location.pathname.split('/')[2]
  fetch(`${hosts}/rooms/${room_number}/play.json`)
  .then(response => response.json())
  .then(result => {
    const token = result[0]
    const apiKey = result[1]
    const sessionId = result[2]
    // Replace replacementElementId with the ID of the DOM element to replace:
    var session = OT.initSession(apiKey, sessionId);
   // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
      session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    });

    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      }
    });
  })
}

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}
