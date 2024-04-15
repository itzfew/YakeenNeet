// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDyuYw6oJzE0cJD6WTau4q5mtM8OagssIs",
    authDomain: "freestudyapp-170e1.firebaseapp.com", // Corrected authDomain
    projectId: "freestudyapp-170e1",
    storageBucket: "freestudyapp-170e1.appspot.com",
    messagingSenderId: "58849335299",
    appId: "1:58849335299:android:2fa6a0430030367f1c5636"
};
firebase.initializeApp(firebaseConfig);

// Function to retrieve polls from the database
function getPolls() {
    firebase.database().ref('polls').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var poll = childSnapshot.val();
            var question = poll.question;
            var options = poll.options;
            // Populate HTML elements with question and options
            var pollContainer = document.getElementById('poll-container');
            var pollElement = document.createElement('div');
            pollElement.innerHTML = '<h2>' + question + '</h2>';
            var optionsList = document.createElement('ul');
            Object.keys(options).forEach(function(option) {
                var optionButton = document.createElement('button');
                optionButton.className = 'option-btn';
                optionButton.setAttribute('data-poll-id', childSnapshot.key); // Add data-poll-id attribute
                optionButton.setAttribute('data-option', option); // Add data-option attribute
                optionButton.innerText = option;
                optionsList.appendChild(optionButton);
            });
            pollElement.appendChild(optionsList);
            pollContainer.appendChild(pollElement);
        });
    });
}

// Function to save user response to the database
function saveResponse(pollId, option) {
    var pollRef = firebase.database().ref('polls/' + pollId + '/options/' + option);
    pollRef.transaction(function(currentCount) {
        return currentCount + 1;
    });
}

// Function to update UI with real-time response counts
function updateResponseCounts(pollId) {
    firebase.database().ref('polls/' + pollId + '/options').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var optionId = childSnapshot.key;
            var count = childSnapshot.val();
            // Update UI with response count for each option
            var optionButton = document.querySelector('.option-btn[data-option="' + optionId + '"][data-poll-id="' + pollId + '"]');
            if (optionButton) {
                optionButton.innerText = optionId + ' (' + count + ')';
            }
        });
    });
}

// Call the functions to initialize the page
window.addEventListener('load', function() {
    getPolls();
});

// Add event listeners to option buttons to handle user responses
document.querySelectorAll('.option-btn').forEach(function(optionButton) {
    optionButton.addEventListener('click', function() {
        var pollId = this.getAttribute('data-poll-id');
        var option = this.getAttribute('data-option');
        saveResponse(pollId, option);
    });
});

// Inside the getPolls() function, after displaying each poll
updateResponseCounts(pollId);
