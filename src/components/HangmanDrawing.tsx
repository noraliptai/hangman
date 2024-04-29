
const head = (
    <div style={{width: "50px", height: "50px", borderRadius: "100%", border: "10px solid black", position: "absolute", top: "50px", right: "-30px"}}/>
)

const body = (
    <div style={{width: "10px", height: "100px", background: "black", position: "absolute", top: "120px", right: "0"}}/>
)

const rightArm = (
    <div style={{width: "100px", height: "10px", background: "black", position: "absolute", top: "150px", right: "-100px", rotate: "-30deg", transformOrigin: "left bottom"}}/>
  )
  
const leftArm = (
<div style={{ width: "100px", height: "10px", background: "black", position: "absolute", top: "150px", right: "10px", rotate: "30deg", transformOrigin: "right bottom"}}/>
)

const rightLeg = (
<div style={{ width: "100px", height: "10px", background: "black", position: "absolute", top: "210px", right: "-90px", rotate: "60deg", transformOrigin: "left bottom"}}/>
)

const leftLeg = (
<div style={{ width: "100px", height: "10px", background: "black", position: "absolute", top: "210px", right: 0, rotate: "-60deg", transformOrigin: "right bottom"}}/>
)

const hangmanBody = [head, body, rightArm, leftArm, rightLeg, leftLeg]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return <div style={{position: "relative"}}>
        {hangmanBody.slice(0, numberOfGuesses)}
        <div style={{height: "50px", width: "10px", background: "black", position: "absolute", top: "0", right: "0"}}></div>
        <div style={{height: "10px", width: "200px", background: "black", marginLeft: "120px"}}></div>
        <div style={{height: "400px", width: "10px", background: "black", marginLeft: "120px"}}></div>
        <div style={{height: "10px", width: "250px", background: "black"}}></div>
    </div>
}