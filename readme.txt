BLACK BOX - TWITTER BOT - VERSION 2 (PARALLEL)



// How To Use
To run the program with a given set of topics, currently it is hardcoded to take in 3 topics and collect them in parallel and
in order to change that you have to hardcode it in the source code.

1) Update the topics file, with one topic per line
2) run ./shell <interval length: number> <number of intervals: number> in the root directory

Remove all files from the data/ directory before running the bot.
The bot will produce n-1 number of data/datai.json and data/ploti.json files where n is the number of topics, starting at 0.
The bot will produce n-1 number of plots/... files as well.
You will need to clear the data/ and plots/ directories for different runs,
so store the data elsewhere or it will be over-written.



// How To Modify
In order to set more detailed configurations, you will have to modify the source code in "./bot.ts".
