# This is the program that will visualize JSON data from a file
# Uses matplotlib
# python -m pip install -U matplotlib

import sys
import json
import matplotlib.pyplot as plt
import numpy as np



## Configuration
# File path
directory = './data/'
# Get the CLAs and create entire path
num = int(sys.argv[1])
filename = 'channel' + str(num) + 'plot.json'
path = directory + filename
plot = './plots/' + 'channel' + sys.argv[1] + 'data_plot.png'



# Opening JSON file 
f = open(path,)
# Returns JSON object as a dictionary 
data = json.load(f)



# Get the number of objects in the file and initialize the list size
size = 0
for i in data['dataset']:
    size += 1
axis_x = [None] * size
axis_y = [None] * size

# Iterating through the json list
counter = 0
for i in data['dataset']: 
    # print(i)
    axis_x[counter] = i["label"]
    axis_y[counter] = i["y"]
    counter += 1

# Close file 
f.close()



### Plot the data
# Rotate the x-axis labels
plt.xticks(rotation=45)


# Call the plot function
plt.plot(axis_x, axis_y)
# Display the plot
# plt.show()
# Save the plot
plt.savefig(plot)