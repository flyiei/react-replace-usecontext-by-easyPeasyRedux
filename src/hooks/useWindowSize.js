import { useState, useEffect } from 'react'

// This is a custom Hook useWindowSize
const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        hight: undefined
    })

    // useEffect(() => {}, [])

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();
        // 'resize' event will add once at each time you make file changes 
        window.addEventListener("resize", handleResize);
        // removing the 'resize' event listener to prevent memory leak in our app
        // we like to clean the event in case of changing the file and reaload, and when the app close
        const cleanUp = () => {
            console.log(' Runs if a useEffect dependency changes');
            window.removeEventListener("resize", handleResize);
        }
        // Returning 'cleanUp' to let 'useEffect' to use the cleanUp 
        return cleanUp;
    }, [])

    return windowSize;
}

export default useWindowSize