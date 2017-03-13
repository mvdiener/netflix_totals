function fillArray() {
	var array = [];
	// Uncomment below to test with sample size that is random modulo 3
	// var amount = Math.floor(Math.random() * (2 - 0 + 1)) + 0
	while (array.length < 1000 /*+ amount*/) {
		var rand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		array.push(rand);
	}
	return array;
}

function removePieces(array) {
	while(array.length >= 3) {
		var pickThree = [array.pop(), array.pop(), array.pop()];
		pickThree.sort();
		if (pickThree[0] != pickThree[2] && (pickThree[1] == pickThree[2] || pickThree[1] == pickThree[0])) {
			if (pickThree[1] == pickThree[0]) {
				array.push(pickThree[2]);
			} else {
				array.push(pickThree[0]);
			}
		}
		shuffleArray(array);
	}
	return array;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function run() {
	var bag = fillArray();
	var eaten = removePieces(bag);
	return (eaten);
}

function runPercentages(timesToRun) {
	var obj = {0: 0, 1: 0, 2: 0}
	for (var i = 0; i <= timesToRun; i++) {
		var eaten = run();
		obj[eaten.length] += 1;
	}
	total = obj[0] + obj[1] + obj[2];
	console.log((obj[2]/total)*100 + "% chance to have two pieces remaining.");
	console.log((obj[1]/total)*100 + "% chance to have one piece remaining.");
	console.log((obj[0]/total)*100 + "% chance to have no pieces remaining.");
}
