const keyStrokeSound = [
    new Audio("/sounds/1.mp3"),
    new Audio("/sounds/2.mp3"),
    new Audio("/sounds/3.mp3"),
    new Audio("/sounds/4.mp3"),
  ];
  

 const useKeyboardSound= ()=>{
    const playRandomKeyStrokeSound = ()=>{
        const randomSound = keyStrokeSound[Math.floor(Math.random()*keyStrokeSound.length)]
        randomSound.currentTime =0
        randomSound.play()
    }

    return {playRandomKeyStrokeSound}
}

export default useKeyboardSound