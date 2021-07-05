# Use the dot-slash syntax to run this script ./shell.

# Save the directory of the python file for data visualization.
$file = 'datavisualization/main.py'

# Read topics from the text file into a array which contains a topic per line and this a topic per index of the array
[string[]]$topics = Get-Content -Path 'topics.txt'

# Read in the CLAs for setting the interval length and the number of intervals
# [0] = delta t
# [1] = n
[string[]]$clas=$args

# Pass the topics array into the bot
node bot.js $clas[0] $clas[1] $topics out-null

# After all of the data has been stored, loop through all plot.json files and plot them 
for($i = 1; $i -le $topics.length; $i++){
    python $file $i
}