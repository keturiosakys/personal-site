const htmlmin = require("html-minifier");
const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {

  // markdown engine config
  let markdownIt = require("markdown-it");
  let markdownItImplicitFigure = require("markdown-it-implicit-figures");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  let figureOptions = {
    figcaption: true
  }

  const markdownEngine = markdownIt(options);
  markdownEngine.use(markdownItImplicitFigure, figureOptions);
  eleventyConfig.setLibrary("md", markdownEngine);

  // .ignore settings
  eleventyConfig.setUseGitIgnore(false);

  // rendering passthrough settings
  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addPassthroughCopy("src/uploads");

  eleventyConfig.addPassthroughCopy({
    "./src/styles/prism-nord.css": "./css/prism-nord.css",
  });

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./css/style.css" });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
  });

  //easy layout references (without the .html append)
  eleventyConfig.addLayoutAlias("default", "default.html");
  eleventyConfig.addLayoutAlias("blog", "blog.html");
  eleventyConfig.addLayoutAlias("post", "post.html");

  //Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  //Support for YAML in _data
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Convert to human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "LLL dd, yyyy"
    );
  });
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
