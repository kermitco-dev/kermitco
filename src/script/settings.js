document.addEventListener("DOMContentLoaded", function() {
    if (window.location.search != "") {
        const params = new URLSearchParams(window.location.search);
        if (params.has("background_url")){
            UIJS.getElement("body").style("background-image", `url("${params.get("background_url")}")`);
            Cookies.storeWithTime("background_image", params.get("background_url"), 43200000);
        }
        if (params.has("font_color")){
            UIJS.getElement("*").style("color", params.get("font_color"));
            Cookies.storeWithTime("font_color", params.get("font_color"), 43200000);
        }
    }
    document.getElementById("font_color").value = Cookies.has("font_color") ? Cookies.retrieve("font_color") : "#ffffff";
});

document.getElementById("light_mode_switch").addEventListener("change", function(event) {
    if (event.currentTarget.checked) {
        UIJS.getElement("*").style("color", "rgb(0,0,0)");
        Cookies.storeWithTime("font_color", "rgb(0,0,0)", 43200000);
    } else {
        UIJS.getElement("*").style("color", "rgb(255,255,255)");
        Cookies.storeWithTime("font_color", "rgb(255,255,255)", 43200000);
    }
});
document.getElementById("font_color").addEventListener("input", function(event) {
    UIJS.getElement("*").style("color", event.target.value);
    Cookies.storeWithTime("font_color", event.target.value, 43200000);
});
document.getElementById("background_url_submit").addEventListener("click", function(event) {
    UIJS.getElement("body").style("background-image", UIJS.Image.getImageURL(document.getElementById("background_url").value));
    Cookies.storeWithTime("background_image", document.getElementById("background_url").value, 43200000);
});
document.getElementById("create_link").addEventListener("click", function() {
    document.getElementById("link_creation_target").href = window.location.origin + "/settings.html?background_url=" + (Cookies.retrieve("background_image") ? Cookies.retrieve("background_image"): + "https://google.com/") + "&font_color=" + (Cookies.retrieve("font_color") ? Cookies.retrieve("font_color") : "rgb(255,255,255)");
    document.getElementById("link_creation_target").innerText = "high pickel";
});
document.getElementById("italic_link_switch").addEventListener("change", function(event) {
    if (event.currentTarget.checked) {
        UIJS.getElement("a").style("font-style", "italic");
        Cookies.storeWithTime("italic_anchor", "italic", 43200000);
    }
    else {
        UIJS.getElement("a").style("font-style", "normal");
        Cookies.storeWithTime("italic_anchor", "normal", 43200000);
    }
}); 
document.querySelectorAll("a").forEach(m => {
    m.style.color = document.getElementById("font_color").value;
});
document.styleSheets[0].insertRule("::placeholder {color" + ": " + document.getElementById("font_color").value + " !important;}", 0);
function ResetCSS() {
    document.getElementsByClassName("custom_css_styling").innerHTML = "";
}
function InjectCSS() {
    if (document.getElementsByClassName("custom_css_styling").length > 0) {
        let cssContent = "";
        for (let i = 0; i < document.getElementsByClassName("custom_css_styling").length; i++) {
            cssContent += document.getElementsByClassName("custom_css_styling")[i].innerHTML + "\n";
        }
        document.getElementById("custom_css_form").value = cssContent;
    } else {
        let CSS_BOX = document.createElement("style");
        CSS_BOX.innerHTML = document.getElementById("custom_css_form").value;
        CSS_BOX.className = "custom_css_styling";
        document.head.appendChild(CSS_BOX);
    }
}