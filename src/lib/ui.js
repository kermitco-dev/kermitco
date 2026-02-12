const UIJS = {
    Element: class {
        constructor(selector) {this.elem = document.querySelectorAll(selector);}
        background_color(color) {this.style("background-color", color);return this;}
        font(font_family) {this.style("font-family", font_family);return this;}
        text_color(color) {this.style("color", color);return this;}
        background_rotation(background_list, milis) {
            background_list = UIJS.Image.getImageURL(background_list);
            this.style("background-image", background_list[Math.floor(Date.now() / milis) % background_list.length]);
            this.style("background-size", "cover");
            this.style("background-attachment", "fixed");
            this.style("background-position", "center center")
            return this;
        }
        style(property, value) {
            property.charAt(0).toUpperCase()
            
            this.elem.forEach((a) => {
                a.style[property] = value;
            })
            return this;
        }
        getElement(selector) {
            return new UIJS.Element(selector);
        }
    },
    Image: class {
        constructor(url) {this.url = url;}
        static getImageURL(x) {
            if (Array.isArray(x)) {
                for (let y in x) {
                    x[y] = UIJS.Image.getImageURL(x[y]);
                }
                return x;
            } else if (typeof x == "string") {return "url(\"" + x + "\")"
            } else if (x instanceof UIJS.Image) {return x.url;
            } else {
                throw new TypeError("Isn't of UIJS.Image, String, or Array!");
                return x;
            }
        }
    },
    getElement(selector) {
        return new UIJS.Element(selector);
    },
    start() {
        document.querySelectorAll("html, body").forEach((a) => {
            a.style["top"] = 0;
            a.style["left"] = 0;
            a.style["margin"] = 0;
            a.style["top"] = 0;
            a.style["height"] = "100%";
            a.style["width"] = "100%";
        });
        return this;
    }
}
