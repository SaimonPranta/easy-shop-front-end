const processingHandle = (state, setState) => {
    const currentCondition = { ...state }
    currentCondition.processing = true
    setState(currentCondition)
    setTimeout(() => {
        const currentCondition2 = { ...state }
        currentCondition2.processing = false
        setState(currentCondition2)
    }, 10000);
}

export default processingHandle;