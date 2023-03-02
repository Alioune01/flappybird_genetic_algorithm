v0~ This one creates neural networks that all have the same number of layers

Neural Network Library:
	How we want the library to work is that the constructor for the neural network class takes in an array,
(the length of which will tell how many layers there are), an array of inputs, and an array of outputs. For the
first array denoting the layers, each number in the array denotes the number of nodes in each layer. The first
number, therefore, must equal the length of the second array, and the last must equal the length of the last
array. 

NeuralNetwork class:
	The neural network class constructor takes in 3 variables: the layerArray, inputArray, and output. 
The layer array length denotes the number of layers in our network, and the numbers at each index denote the
number of nodes in the respective layer. The input array is an array of the literal inputs, and the output is
just the number of output nodes of the neural network. This means that the length of the input array must be 
the same as the first index of layerArray, and the number of outputs must be equal to the last index of the 
layerArray. 
	We have an instance variable called layers, which is an array full of layer objects. These are objects
that actually hold the perceptrons themselves.

Layer class:
	The layer class constructor takes in 2 variables: the number of nodes in the current layer (layer object)
and the previous layer. Either inputs or the previous layer's nodes are required to generate the weight matrix
for the current layer. As you can see, the prevous layer is either an input array or an actual layer object 
from the previous layer.

Perceptron class:
	The perceptron class takes in the number of inputs, and obviously just has the number of weights as 
inputs. It can probably have a weighted sum method or something.


BEST PERFORMING NETWORKS:
	Session5 Gen7  Y
	Session5 Gen6  Y
	Session4 Gen3 !Y
	Session1 Gen1 !Y


CHALLENGES:

	Problem~
		How do we create a hundred new birds from just the 2 best birds?
	
	Solution 0~
		Our first solution is to copy the bird, but change a random...idunno, half...of the weights to random values. In our first attempt, 
	we do this with a function called randomize. This function picks a random half of each layer's nodes and changes about half the 
	weights and the bias. 
	
	Solution 0.1~ Use of same randomize algorithm, but we put the best of each generation in a MongoDB database, and then being able to 
	select them and watch them play, viewing their brains as they play. This should be done with other versions as well.