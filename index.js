var tmi = require('tmi.js');
var fs = require('fs');

var options = {

    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "",
        password: ""
    },
    channels: [""]
};


var client = new tmi.client(options);
var people;
var peopleWhispered;
var personcount = 0;
var messageTopeople = "hi, can you please Checkout my friend  https://www.twitch.tv/kfpgod hes tryna make it on twitch, He streams everyday at 6 PM ,im trying to help him make it fulltime ty <3";
fs.readFile('USERS_TO_WHISPER.txt', 'utf8', function(err, con) {
    people = con.split("\r\n");
});
fs.readFile('WHISPERED_ALREADY.txt', 'utf8', function(err, con) {
    peopleWhispered = con.split("\r\n");
});

client.connect();


client.on('connected', function(address, port) {
    console.log('spojen');
});

function sendWhisperToperson() {
    if(peopleWhispered.includes(people[personcount])) {
        return personcount++;
    } else {

        client.whisper(people[personcount], messageTopeople);
        console.log(`${people[personcount]} : ${messageTopeople}`);
        fs.appendFile('WHISPERED_ALREADY.txt', `\r\n${people[personcount]}`, 'utf8', function(err) {
            if (err) console.log(err);
        });
        personcount++;
    }
}
setInterval(sendWhisperToperson, 5000);


