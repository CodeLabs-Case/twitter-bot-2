// Is part of a data collection and visualization project.

// Overview of how the API works.

/// There are three catagories for the kind of functionality that the API provides:
// get() -> searching by: hashtag, location, user, etc.
// post() -> tweeting, retweeting, etc.
// stream() -> continually get information based on conditions and trigger events.

// The overall structure of the functions attached to get, post and stream
// The first argument is the endpoint, i.e statuses/filter.
// The second argument are the possible parameters which are { follow, track, locations } ...
// ... follow takes user_id, track can take strings that will be in the tweet, locations takes pairs of comma separated lat/longs.
// The third and last argument is a callback function with err, response being the parameters and sometimes one in the middle like data.

// This is not an accurate way to measure the trend of a topic, as it doesn't include the full interval of time ...
// ... from when the topic entered the trending catagory to when it left, instead, only when I chose to run the stream.
// Count the number of times the topic is mentioned, update the JSON object, print it to the file and every 10 minutes post ...
// ... a tweet containing the data collected.

// Use the config file for authentication.
var config = require('./config')
// Pull in the package
var twit = require('twit')
// Instantiate the packeage.
var T = new twit(config)
// For saving data from Twitter, I will be using the navtive module fs.
var fs = require('fs')
// This is the default way to read from a file, require it, but this will open it only once, so only good at the start
// of the operations for reading in data and then moving on.
// You could require it again later, but there is a better way.
//var file = require('./data.json')

// This is a new package that will allow you to run multiple streams at the same time which is amazing.
var TwitterStreamChannels = require('twitter-stream-channels')
var client = new TwitterStreamChannels(config)

interface channel {
    "topic1" : Array<String>
    "topic2" : Array<String>
    "topic3" : Array<String>
  }
var channels :  channel = {
	"topic1" : [],
	"topic2" : [],
	"topic3" : []
};





//// CONFIGURATION SECTION
// Pull in the CLAs
// [2] = delta, [3] = n, [4] = Topic1, [5] = Topic2, [6] = Topic3
var delta: number = parseInt(process.argv[2])
var n: number = parseInt(process.argv[3])
// Put the CLAs into the channels
channels.topic1 = [`#${process.argv[4]}`, process.argv[4]]
channels.topic2 = [`#${process.argv[5]}`, process.argv[5]]
channels.topic3 = [`#${process.argv[6]}`, process.argv[6]]

/// Number of iterations of the stream/data loops from start = iter to end = max; [iter - max]
// Start
var iter = 0
// End
var max = n

var file1 = './data/channel1data.json'
var file2 = './data/channel2data.json'
var file3 = './data/channel3data.json'

// Using date to calculate time intervals
var dateStart1: any = new Date()
var dateStart2: any = new Date()
var dateStart3: any = new Date()





//// DATA SECTION
// Channel 1
// Channel 1 - DATA
var channel1arrays = {
    dataArray: [],
    plotArray: []
}
var channel1json = {
    // This is the JSON data structure that will be updated, converted and then eventually written to the file
    data: { trending: channels.topic1, start: '', end: '', count: 0 },
    dataSet: { "dataset": channel1arrays.dataArray },
    plotSet: { "dataset": channel1arrays.plotArray }
}
// Channel 2
// Channel 2 - DATA
var channel2arrays = {
    dataArray: [],
    plotArray: []
}
var channel2json = {
    data: { trending: channels.topic2, start: '', end: '', count: 0 },
    dataSet: { "dataset": channel2arrays.dataArray },
    plotSet: { "dataset": channel2arrays.plotArray }
}
// Channel 3
// Channel 3 - DATA
var channel3arrays = {
    dataArray: [],
    plotArray: []
}
var channel3json = {
    data: { trending: channels.topic3, start: '', end: '', count: 0 },
    dataSet: { "dataset": channel3arrays.dataArray },
    plotSet: { "dataset": channel3arrays.plotArray }
}





//// INTERVAL SECTION
///*
var timestampSet = "short"
var intervalID = setInterval(()=>{
    // Push the data to the cooresponding array
    channel1arrays.dataArray.push({
        trending: channel1json.data.trending,
        start: channel1json.data.start,
        end: channel1json.data.end,
        count: channel1json.data.count
    })
    channel2arrays.dataArray.push({
        trending: channel2json.data.trending,
        start: channel2json.data.start,
        end: channel2json.data.end,
        count: channel2json.data.count
    })
    channel3arrays.dataArray.push({
        trending: channel3json.data.trending,
        start: channel3json.data.start,
        end: channel3json.data.end,
        count: channel3json.data.count
    })



    // Reset the data for the next interation
    channel1json.data.count = 0
    dateStart1 = new Date()
    channel1json.data.start = getTimestamp(timestampSet)
    channel2json.data.count = 0
    dateStart2 = new Date()
    channel2json.data.start = getTimestamp(timestampSet)
    channel3json.data.count = 0
    dateStart3 = new Date()
    channel3json.data.start = getTimestamp(timestampSet)
    
    
    iter++

    if(iter == max) {
        // Write to files
        let jsonString1A = JSON.stringify(channel1json.dataSet, null, 2)
        let jsonString2A = JSON.stringify(channel2json.dataSet, null, 2)
        let jsonString3A = JSON.stringify(channel3json.dataSet, null, 2)
        // Write the strings to the files
        fs.writeFile(file1, jsonString1A, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        fs.writeFile(file2, jsonString2A, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        fs.writeFile(file3, jsonString3A, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })


        // Convert the captured format to one that can be plotted and then write it to a file ...
        // ... to be used in the plotting step
        convertToPlot(channel1json.dataSet, channel1json.plotSet)
        console.log(channel1json.plotSet)
        convertToPlot(channel2json.dataSet, channel2json.plotSet)
        console.log(channel2json.plotSet)
        convertToPlot(channel3json.dataSet, channel3json.plotSet)
        console.log(channel3json.plotSet)

        // You will convert the plot JSON object into a String so that it can be written to a file; the technical term is: serialization.
        let jsonString1B = JSON.stringify(channel1json.plotSet, null, 2)
        let jsonString2B = JSON.stringify(channel2json.plotSet, null, 2)
        let jsonString3B = JSON.stringify(channel3json.plotSet, null, 2)
        // Write the string to the file
        fs.writeFile('./data/channel1plot.json', jsonString1B, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        fs.writeFile('./data/channel2plot.json', jsonString2B, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        fs.writeFile('./data/channel3plot.json', jsonString3B, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })



        // Exit out of the stream object
        stream.stop()
        // Exit out of the interval function
        clearInterval(intervalID)
    }
}, delta*60*1000)
//*/





//// STREAMING SECTION
channel1json.data.start = getTimestamp(timestampSet)
channel2json.data.start = getTimestamp(timestampSet)
channel3json.data.start = getTimestamp(timestampSet)

var stream = client.streamChannels({track:channels})
// CHANNEL 1 - STREAM
// Start the stream
stream.on('channels/topic1', (tweet) => {
    // Store the data in the temporary data structure
    channel1json.data.count = channel1json.data.count + 1
    console.log('Text: ' + tweet.text);
    console.log('Name: ' + tweet.user.screen_name)
    console.log('Mentions: ' + channel1json.data.count)
    console.log(channel1json.data.end = getTimestamp(timestampSet))
})
//*/

// CHANNEL 2 - STREAM
// Start the stream
stream.on('channels/topic2', (tweet)=>{
    // Store the data in the temporary data structure
    channel2json.data.count = channel2json.data.count + 1
    console.log('Text: ' + tweet.text)
    console.log('Name: ' + tweet.user.screen_name)
    console.log('Mentions: ' + channel2json.data.count)
    console.log(channel2json.data.end = getTimestamp(timestampSet))
})
//*/

// CHANNEL 3 - STREAM
// Start the stream
stream.on('channels/topic3', (tweet) => {
    // Store the data in the temporary data structure
    channel3json.data.count = channel3json.data.count + 1
    console.log('Text: ' + tweet.text)
    console.log('Name: ' + tweet.user.screen_name)
    console.log('Mentions: ' + channel3json.data.count)
    console.log(channel3json.data.end = getTimestamp(timestampSet))
})
//*/





// Will read from a JSON file that was used to collect mention data and post the data to Twitter.
///*
function tweetData(filepath) {
    // Read in the data from the file.
    var contents = fs.readFileSync(filepath)
    var jsonContent = JSON.parse(contents)

    var tweet = {
        status: 'Mentions @ [ ' + jsonContent.start + ', ' + jsonContent.end + ' ]: ' + jsonContent.count +
        '\n\n\nCourtesy of a friendly Twitter bot.'
    }

    // status updates are just tweets
    T.post('statuses/update', tweet, (tweeted))

    // This is a callback function, a function passed to another function and called within it, that
    // reports the status of the main function call
    function tweeted(err, data, response) {
        if(err) {
            console.log('Unsuccessful!')
        }else{
            console.log('Success!')
        }
    }
}
//*/





// Will read from a JSON object and tweet the values
///*
function tweetJSON(topic, jsonobject) {

    var tweet = {
        status: topic + ' mentions @ [ ' + jsonobject.start + ', ' + jsonobject.end + ' ]: ' + jsonobject.count +
        '\n\n\nCourtesy of a friendly Twitter bot.'
    }

    // status updates are just tweets
    T.post('statuses/update', tweet, (tweeted))

    // This is a callback function, a function passed to another function and called within it, that
    // reports the status of the main function call
    function tweeted(err, data, response) {
        if(err) {
            console.log('Unsuccessful!')
        }else{
            console.log('Success!')
        }
    }
}
//*/


// This stream will reply to a specified tweet and is able to ignore retweets
/*
var accounts = [ 
    50089932,  // [0] @blackBoxMod
    25073877,  // [1] @realDonaldTrump
    759251,    // [2] @cnn
    2899773086 // [3] @Every3Minutes
];
let status = '#AddressClimateChange'
var stream = T.stream('statuses/filter', { follow: accounts[1] });
stream.on('tweet', (tweet)=>{
    let params = {
        status: status,
        in_reply_to_status_id: tweet.id_str,
        auto_populate_reply_metadata: true
    }

    ///*
    // This conditional is key to differentiating between a tweet and a retweet
    if(tweet.user.id == accounts[1] && !tweet.retweeted_status){
        console.log('-----------------------------------');
        console.log('Text: ' + tweet.text);
        console.log('Name: ' + tweet.user.screen_name);
        console.log('User Id: ' + tweet.user.id);
        console.log('Tweet Id: ' + tweet.id);
        console.log('-----------------------------------');

        T.post('statuses/update', params, (err, data, response)=>{
            if(err){
                console.log('Fail');
                console.log('-----------------------------------');
            }else{
                console.log('Success')
                console.log('-----------------------------------');
            }
        });
    }
    *
});
*/



// Return all tweets that contain the string parameter that were posted recently, the q "key" is used here and the "value" is the parameter
/*
T.get('search/tweets', {q: '#tesla'}, (error, tweets, response)=>{
    // Return all tweets
    //console.log(tweets)
    
    // Return specific tweet
    //console.log(tweets.statuses[0])
    
    // Iterate through all tweets and pull out specific values, here I pull out the text of the tweet
    for(var i of tweets.statuses){
        console.log(i.text)
        console.log("-----------------------------------------")
    }
})
*/



// Returns a variety of information about the user specified by the required user_id or screen_name parameter. 
// The author's most recent Tweet will be returned inline when possible.
/*
T.get('users/show', {user_id: 25073877}, (error, tweet, response)=>{
    var tweet = {
        status: "Last Tweet"
    }
    T.post('statuses/update', tweet, ()=>{
    })
    console.log(tweet)
})
*/



// This request returned my own statuses
/*
var params = {screen_name: ''}
T.get('statuses/user_timeline', params, (error, tweets, response)=>{
    if(!error){
        console.log(tweets);
    }
})
*/



// function to return a timestamp 
function getTimestamp(length){
    const date = new Date()
    var year: any = date.getFullYear()
    var month: any = date.getMonth() +  1 // This returns 0 - January, 1 - February, ... so you will need to add 1
    var day: any = date.getDate() // getDate() gets the day of the month while getDay() gets the day of the week, 0 - Sunday, 1 - Monday
    var hour: any = date.getHours()
    var min: any = date.getMinutes()
    var sec: any = date.getSeconds()

    // We need to manually add the digits for single digit values
    if(month < 10){ month = '0' + month }
    if(day < 10){ day = '0' + day }
    if(hour < 10){ hour = '0' + hour }
    if(min < 10){ min = '0' + min }
    if(sec < 10){ sec = '0' + sec }

    // Formats for the timestamps, choose one, (f)ull, (l)ong, (m)edium, (s)hort
    var timestamp
    if(length === "full") {
        timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + ' EST'
    }
    else if(length === "long") {
        timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ' EST'
    }
    else if(length === "medium") {
        timestamp = hour + ':' + min + ' EST'
    }
    else if(length === "short") {
        timestamp = hour + ':' + min
    }

    return timestamp
}


// Convert JSON array to JSON array with specified x and y fields
function convertToPlot(objIn, objOut){
    for (var i = 0; i < objIn.dataset.length; i++) {
		objOut.dataset.push({
            title: objIn.dataset[i].trending,
			x: objIn.dataset[i].start,
			y: objIn.dataset[i].count
		})
    }
}