export function bytesToMB(inByte: number): string {
    return (inByte / 1000000).toFixed(3) + " MB"
}

export function getDayTimeToStringFromSec(secs: number) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(secs*1000);
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = String(d.getMinutes());
    if (Number(min) < 10) {
        min = "0" + min;
    }
    let ampm = "am";
    if (hr > 12) {
        hr -= 12;
        ampm = "pm";
    }
    return day + " " + hr + ":" + min + ampm
}

export function getDateToStringFromSec(secs: number) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date(secs*1000);
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return  date + " " + month + " " + year;
    return (new Date(secs * 1000)).toLocaleString();
}