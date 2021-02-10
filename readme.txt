BLACK BOX - TWITTER BOT - VERSION 2 (PARALLEL)



// How To Use
To run the program with a given set of topics, currently it is hardcoded to take in 3 topics and collect them in parallel and
in order to change that you have to hardcode it in the source code.

1) Update the topics file, with one topic per line
2) run ./shell <delta> <n>

Remove all files from the data/ directory before running the bot.
The bot will produce n-1 number of data/datai.json and data/ploti.json files where n is the number of topics, starting at 0.
The bot will produce n-1 number of plots/... files as well.
You will need to clear the data/ and plots/ directories for different runs,
so store the data elsewhere or it will be over-written.



// How To Modify
In order to set more detailed configurations, you will have to modify the source code in "./bot.ts".
[file number] is an arbitrary number of your choosing to save the data into.



// IMPORTANT
This bot only operates under the assumption that there will be frequent data coming into at least one of the channels/streams, 
because the timestamps are updated only when a tweet comes in and thus all of the operations that depend on the timestamps,
which are all operations lol, will not happen if there are no new tweets coming in and updating the timestamps for the intervals.

I may not have the time to finish the multi-channel, version 2, of the bot because I will have business elsewhere. I am confident
that I could finish it just from looking at the solution in psuedocode, so I will get it implemented in time.