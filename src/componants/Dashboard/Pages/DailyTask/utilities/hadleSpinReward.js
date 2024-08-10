const handleSpinReward = (arr) => { 
    const totalWeight = arr.reduce((sum, obj) => sum + obj.percentage, 0);
 
    const randomNum = Math.random() * totalWeight;
 
    let cumulativeWeight = 0;
    for (const obj of arr) {
        cumulativeWeight += obj.percentage;
        if (randomNum < cumulativeWeight) {
            return obj;
        }
    }
}
 
// const objects = [
//     { coin: 4, percentage: 20 },
//     { coin: 4, percentage: 30 },
//     { coin: 4, percentage: 50 }
// ];

// // Get a randomly selected object based on percentageage
// const selectedObject = handleSpinReward(objects);
// console.log("selectedObject ======>>>", selectedObject);


export default handleSpinReward
