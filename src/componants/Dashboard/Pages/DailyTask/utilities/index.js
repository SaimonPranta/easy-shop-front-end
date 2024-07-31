const shortText = (text = "", lineCount = 10, dote) => {
    let outPut = text.substring(0, lineCount)
    if (text.length > lineCount) {
        if (outPut.substring(outPut.length / 2, lineCount).includes("।")) {
            const firstPartOfSentence = outPut.substring(0, outPut.length / 2)
            const secondPartOfSentence = outPut.substring(outPut.length / 2, outPut.length)
            const textArray = []
            let find = false
            for (let index = 0; index < secondPartOfSentence.length && !find; index++) {
                const element = secondPartOfSentence[index];
                textArray.push(element)
                if (element === "।" || element === ".") {
                    find = true
                }

            }
            const finalText = firstPartOfSentence + textArray.join("")
            return finalText

        } else {
            if (dote) {
                return `${outPut}...`
            } else {
                return outPut
            }
        }
    }

    return outPut
}


export { shortText }


