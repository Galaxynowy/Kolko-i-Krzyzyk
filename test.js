let objects = [...Array(20).keys()];

const min = {
    width: 0, // percentage
    alpha: 1,
    opacity: 0.1,
    speed: 7, // seconds
    size: 1, // percentage
};
const max = {
    width: 100,
    alpha: 1,
    opacity: 0.1,
    speed: 20,
    size: 10,
};

const randomize = () => {
    const random = {
        width: (Math.random() * (max.width - min.width) + min.width).toFixed(1),
        alpha: (Math.random() * (max.alpha - min.alpha) + min.alpha).toFixed(1),
        opacity: (
            Math.random() * (max.opacity - min.opacity) +
            min.opacity
        ).toFixed(1),
        speed: (Math.random() * (max.speed - min.speed) + min.speed).toFixed(1),
        size: (Math.random() * (max.size - min.size) + min.size).toFixed(0),
        animation: (Math.random() * (8 - 1) + 1).toFixed(0),
    };
    return random;
};

document.querySelector("div.background").innerHTML = 
    "<div class=\"background\">" +
    objects.map((object, index) => {
        const random = randomize();
        const style = {
            backgroundColor: `hsl(0, 100%, 50%)`,
            borderColor: `hsl(0, 100%, 50%)`,
            opacity: random.opacity,
        };
        return (
            "<div " +
            "class=\"rgbblocks\" " +
            "style=\"width: " + random.size + "%; " +
            "animation: rgbblocks" + random.animation + " " + random.speed + "s linear infinite; " +
            "left: " + random.width + "%;\" " +
            "key=" + index + ">" +
            "<div class=\"top\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "<div class=\"bottom\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "<div class=\"right\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "<div class=\"left\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "<div class=\"front\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "<div class=\"back\" style=\"background-color: hsl(0, 100%, 50%); " +
            "border-color: hsl(0, 100%, 50%); " +
            "opacity: " + random.opacity + ";\"></div>" +
            "</div>"
        );
    }
    ).join("") +
    "</div>";
