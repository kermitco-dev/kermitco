const background_image_num = 7;

let background_images = [];
for (let i = 1; i <= background_image_num; i ++) {
    background_images.push("./images/background/image_" + i + ".jpeg");
}
console.log("background images:" + background_images);

document.addEventListener("DOMContentLoaded", function() {
    console.log("Settings loading...");
    if (!(new URLSearchParams(window.location.search)).has("background_url")) {
        if (Cookies.retrieve("background_image") != null && Cookies.retrieve("background_image") != "") {
            console.log("background_image: " + Cookies.retrieve("background_image"));
            UIJS.getElement("body")
            .style("background-image", `url("${Cookies.retrieve("background_image")}")`);
        } else {
            const to_keep = background_images[Math.floor(Math.random() * background_images.length)];
            UIJS.getElement("body").style("background-image","url(\"" + to_keep + "\")");
            Cookies.storeWithTime("background_image", to_keep, 43200000);
            console.log("background_image: " + to_keep);
        }
    } else {
        console.log("background_url already present, canceling execution...");
    }
    if (!(new URLSearchParams(window.location.search)).has("font_color")) {
        if (Cookies.retrieve("font_color") != null && Cookies.retrieve("font_color") != "") {
            console.log("font_color: " + Cookies.retrieve("font_color"));
            UIJS.getElement("*")
            .style("color", Cookies.retrieve("font_color"));
        }
    } else {
        console.log("font_color already present, canceling execution...");
    }
    if (!(new URLSearchParams(window.location.search)).has("italic_anchor")) {
        if (Cookies.retrieve("italic_anchor") != null && Cookies.retrieve("italic_anchor") != "") {
            console.log("italic_anchor: " + Cookies.retrieve("italic_anchor"));
            UIJS.getElement("a")
            .style("font-style", Cookies.retrieve("italic_anchor"));
        }
    }
});

document.getElementById("fix_bck").onclick = function() {
    const to_keep = background_images[Math.floor(Math.random() * background_images.length)];
    UIJS.getElement("body").style("background-image","url(\"" + to_keep + "\")");
    Cookies.storeWithTime("background_image", to_keep, 43200000);
    console.log("image: " + to_keep);
}
