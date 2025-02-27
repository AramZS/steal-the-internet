module.exports = function (eleventyObj) {
    let data = eleventyObj.data;
    console.log("slide data", data);
    let image = "";
    let titleTag = "";
    let transition = ""; //data-transition="zoom"
    let backgroundColor = ""; // data-background-color="aquamarine"
    let titleFragment = ""; // class="fragment fade-out"
    let iframeProps = "";
    let extraClass = "";
    let notes = "";
    let cite = "";
    if (data.titleAnimation?.length > 0) {
        titleFragment = `class="${data.titleAnimation}"`;
    }
    if (data.bgColor?.length > 0) {
        backgroundColor = `data-background-color="${data.bgColor}"`;
    }
    if (data.transition?.length > 0) {
        transition = `data-transition="${data.transition}"`;
    }
    if (data.image) {
        image = `<img src="${this.url(data.image)}" />`;
    }
    if (data.iframeUrl) {
        iframeProps = `data-background-iframe="${data.iframeUrl}" data-background-interactive`;
        // Could add data-preload here to load it at the beginning?
        // Check https://revealjs.com/backgrounds/
    }
    if (data.title) {
        titleTag = `<h2 ${titleFragment}>${data.title}</h2>`;
    }
    if (data.iframeProps?.length > 0) {
        extraClass = `class="iframe-frame"`;
    }
    if (data.notes?.length > 0) {
        notes = `<aside class="notes">${data.notes}</aside>`;
    }
    if (data.cite?.length > 0) {
        cite = `<div class="citation"><cite>*From: <a href="${data.cite}" target="_blank" >${data.cite}</a></cite></div>`;
    }
    return `
<section ${extraClass} ${iframeProps} ${transition} ${backgroundColor}>
  ${titleTag}
  ${eleventyObj.content}
  ${image}
  ${cite}
  ${notes}
</section>
`;
};
