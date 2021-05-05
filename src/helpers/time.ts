export const timeDisplay = (seconds: number) => {
    if(seconds > 3600) {
        const hrs = Math.round(seconds * 100 / 3600) / 100;
        return `${hrs} ${hrs > 1 ? 'hrs' : 'hr'}`
    } else if(seconds > 60) {
        const mins = Math.round(seconds * 100 / 60) / 100;
        return `${mins} ${mins > 1 ? 'mins' : 'min'}`
    } else {
        return `${seconds}secs`
    }
}