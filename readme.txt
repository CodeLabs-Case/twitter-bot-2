BLACK BOX - TWITTER BOT - VERSION 2 (PARALLEL)



// How To Use
To run the program with a given set of topics, add those topics to the topics.txt file, with one topic per line.
Currently it is hardcoded to take in 3 topics and collect them in parallel.
In order to change that you have to hardcode it in the source code, which I hope to change if further iterations.
You will need to create files and directories that aer listed in the gitignore file:
    /data
    /plots
    topics.txt
    config.js

1) Update the topics file, with one topic per line
2) run ./shell <delta> <n>
    <delta> is the size of the intervals in minutes
    <n> is the number of intervals, including zero

Remove all files from the data/ directory before running the bot.
The bot will produce n-1 number of data/datai.json and data/ploti.json files where n is the number of topics, starting at 0.
The bot will produce n-1 number of plots/... files as well.
You will need to clear the data/ and plots/ directories for different runs,
so store the data elsewhere or it will be over-written.
