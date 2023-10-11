import { useState } from "react";

export const usePause = () => {

    const [isPaused, setIsPaused] = useState(false);


    return [isPaused, setIsPaused]

};