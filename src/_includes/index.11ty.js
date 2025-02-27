const slideBuilder = require("./slides/slide.11ty.js");

module.exports = function (data) {
    let slides = "";
    Slide = slideBuilder.bind(this);
    console.log(data.collections.slidesBySlug);
    if (data.collections.slidesBySlug) {
        slides = data.collections.slidesBySlug
            .map((slide) => {
                let slideFragment = Slide(slide);
                return `
                ${slideFragment}
            `;
            })
            .join("");
    }
    return /*html*/ `
        <!doctype html>
        <head>
        <script defer data-domain="aramzs.github.io" src="https://plausible.io/js/script.js"></script>

        </head>
        <header>
            <link
                rel="stylesheet"
                href="${this.url("assets/reveal/reveal.css")}"
            />
            <link
                rel="stylesheet"
                href="${this.url("assets/reveal/theme/dracula.css")}"
            />
            <link
            rel="stylesheet"
            href="${this.url("assets/user.css")}"
        />
        </header>
        <title>${data.title}</title>

        <body>
            <div class="reveal">
                <div class="slides">
                    ${slides}
                </div>
            </div>

            <script src="${this.url("assets/reveal/reveal.js")}"></script>
            <script src="${this.url(
                "assets/reveal/plugin/highlight/highlight.js",
            )}"></script>
            <script src="${this.url(
                "assets/reveal/plugin/notes/notes.js",
            )}"></script>
            <script>
                Reveal.initialize({
                    controls: true,
                    progress: true,
                    history: true,
                    slideNumber: false,
                    plugins: [RevealNotes, RevealHighlight],
                });
            </script>
        </body>
    `;
};
