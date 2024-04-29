
type HangmanDrawingProps = {
    numberOfGuesses: number,
    darkTheme: boolean
}

export function HangmanDrawing({ numberOfGuesses, darkTheme=false }: HangmanDrawingProps) {

    const head = (
        <div style={{width: "25px", height: "25px", borderRadius: "100%", border: `5px solid ${darkTheme ? "#e0e0e0" : "#1d1d1d"}`, position: "absolute", top: "25px", right: "-15px"}}/>
    )

    const body = (
        <div style={{width: "5px", height: "50px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "59px", right: "0"}}/>
    )

    const rightArm = (
        <div style={{width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "75px", right: "-50px", rotate: "-30deg", transformOrigin: "left bottom"}}/>
    )
    
    const leftArm = (
        <div style={{ width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "75px", right: "5px", rotate: "30deg", transformOrigin: "right bottom"}}/>
    )

    const rightLeg = (
        <div style={{ width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "105px", right: "-45px", rotate: "60deg", transformOrigin: "left bottom"}}/>
    )

    const leftLeg = (
        <div style={{ width: "50px", height: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "105px", right: 0, rotate: "-60deg", transformOrigin: "right bottom"}}/>
    )

    const hangmanBody = [head, body, rightArm, leftArm, rightLeg, leftLeg]


    return <div style={{position: "relative", marginLeft: "-50px"}}>
        {hangmanBody.slice(0, numberOfGuesses)}
        <div style={{height: "25px", width: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", position: "absolute", top: "0", right: "0"}}></div>
        <div style={{height: "5px", width: "100px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", marginLeft: "120px"}}></div>
        <div style={{height: "200px", width: "5px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", marginLeft: "120px"}}></div>
        <div style={{height: "5px", width: "125px", background: darkTheme ? "#e0e0e0" : "#1d1d1d", marginLeft: "62.5px"}}></div>
    </div>
}