const processingHandle = (state, setState) => {
    const currentCondition = { ...state }
    console.log("1", state)
    currentCondition.processing = true
    setState(currentCondition)
    console.log("2", state)
    setTimeout(() => {
        const currentCondition2 = { ...state }
        console.log("3", state)
        currentCondition2.processing = false
        setState(currentCondition2)
        console.log("4", state)
    }, 10000);
}

export default processingHandle;