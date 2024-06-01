
type HangmanDrawingProps = {
    numberOfGuesses: number,
    darkTheme: boolean,
    difficulty: string
}

export function HangmanDrawing({ numberOfGuesses, darkTheme=false, difficulty }: HangmanDrawingProps) {

    const head = (
        <div style={{width: "25px", height: "25px", borderRadius: "100%", border: `5px solid ${darkTheme ? "#e0e0e0" : "#1d1d1d"}`, boxSizing: "content-box", position: "absolute", top: "25px", right: "-15px"}}/>
    )

    const body = (
        <div style={{width: "5px", height: "50px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "59px", right: "0"}}/>
    )

    const rightArm = (
        <div style={{width: "45px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "70px", right: "-40px", rotate: "40deg", transformOrigin: "left bottom"}}/>
    )
    
    const leftArm = (
        <div style={{ width: "45px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "70px", right: "0", rotate: "-40deg", transformOrigin: "right bottom"}}/>
    )

    const rightLeg = (
        <div style={{ width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "105px", right: "-45px", rotate: "60deg", transformOrigin: "left bottom"}}/>
    )

    const leftLeg = (
        <div style={{ width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "105px", right: 0, rotate: "-60deg", transformOrigin: "right bottom"}}/>
    )

    const hangmanBody = [head, body, rightArm, leftArm, rightLeg, leftLeg]

    const gallowPart1 = (
        <div style={{height: "5px", width: "125px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "205px", left: "50px"}}></div>
    )

    const gallowPart2 = (
        <div style={{height: "200px", width: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "5px", left: "110px"}}></div>
    
    )
    
    const gallowPart3 = (
        <div style={{height: "5px", width: "105px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", bottom: "205px", left: "110px"}}></div>
    )
    
    const gallowPart4 = (
        <div style={{height: "5px", width: "40px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", marginLeft: "0px", rotate: "-45deg", transformOrigin: "left bottom", position: "absolute", top: "28px", left: "115px"}}></div>
    )

    const gallowPart5 = (
        <div style={{height: "25px", width: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "0", right: "0"}}></div>
    )

    const gallow = [gallowPart5, gallowPart4, gallowPart3, gallowPart2, gallowPart1]

    return <div style={{position: "relative", marginLeft: "-50px", height: "210px", width: "220px"}}>
        {difficulty === "hard"
        ?
        gallow.concat(hangmanBody.slice(0, numberOfGuesses))
        :
        difficulty === "medium"
        ?
        gallow.slice(2).concat((gallow.slice(0, 2).reverse().concat(hangmanBody)).slice(0, numberOfGuesses))
        :
        gallow.slice(4).concat((gallow.slice(0, 4).reverse().concat(hangmanBody)).slice(0, numberOfGuesses))
        }
    </div>
}