const shortText = (text = "", lineCount = 10, dote) => {
    let outPut = text.substring(0, lineCount)
   console.log("text.length > lineCount",)
    if (text.length > lineCount) {
        if (outPut.includes("।")) {
            const textArray = []
            let find = false
            for (let i = outPut.length - 10; i < outPut.length; i++) {
                const alphabet = outPut[i];
                if (find) {
                    return
                }
                if (alphabet === "।") {
                    find = true
                }
                textArray.push(alphabet)

            }
            console.log({
                text,
                outPut
            })
            console.log("textArray ====>>", textArray)
            if (textArray.length) {
                const finalText = textArray.join("")

                return finalText
            }
        }

        // if (dote) {
        //     return `${outPut}...`
        // }
    }

    return outPut
}


export { shortText }