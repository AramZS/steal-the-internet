const path = require("path");
const prettier = require("prettier");
var markdownIt = require("markdown-it");
var mila = require("markdown-it-link-attributes");

module.exports = (config) => {
    // This enable all the dependency libraries inside the `assets` folder
    config.addPassthroughCopy({
        "node_modules/reveal.js/dist": "assets/reveal/",
        "node_modules/reveal.js/plugin": "assets/reveal/plugin",
        "src/assets": "assets/",
    });
    let markdownItOptions = {
        html: true,
    };
    let milaOptions = [
        {
            matcher(href) {
                return href.match(/^https?:\/\//);
            },
            attrs: {
                class: "external-link",
                target: "_blank",
            },
        },
    ];
    let markdownLib = markdownIt(markdownItOptions).use(mila, milaOptions);
    //		.use(require("markdown-it-github-headings"));
    config.setLibrary("md", markdownLib);
    // This copies anything from `src/images` into `dist/images`.
    // Call it using <img src="images/my-image.jpg" />
    config.addPassthroughCopy("./src/images/");

    // Prettifies the output html so the indentations are correct
    config.addTransform("prettier", function (content, outputPath) {
        const extname = path.extname(outputPath);
        switch (extname) {
            case ".html":
                // Strip leading period from extension and use as the Prettier parser.
                const parser = extname.replace(/^./, "");
                return prettier.format(content, { parser });

            default:
                return content;
        }
    });

    config.addCollection("slidesBySlug", (collection) =>
        collection.getFilteredByGlob("src/slides/*.md").sort((a, b) => {
            if (b.page.fileSlug > a.page.fileSlug) return -1;
            else if (b.page.fileSlug < a.page.fileSlug) return 1;
            else return 0;
        }),
    );

    return {
        // markdownTemplateEngine: "njk",
        // dataTemplateEngine: "njk",
        // htmlTemplateEngine: "njk",
        pathPrefix: "/steal-the-internet/",
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
