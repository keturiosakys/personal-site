const htmlmin         = require("html-minifier");
const yaml            = require("js-yaml");
const { DateTime }    = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedTwitter    = require("eleventy-plugin-embed-twitter");
const embedYouTube    = require('eleventy-plugin-youtube-embed');
const embedSoundCloud = require("eleventy-plugin-embed-soundcloud");
const pluginSEO       = require("eleventy-plugin-seo");
const markdownItClass = require('@toycode/markdown-it-class');

module.exports = function (eleventyConfig) {

  // markdown engine config
  let markdownIt               = require("markdown-it");
  let markdownItImplicitFigure = require("markdown-it-implicit-figures");
  let markdownItFootnotes      = require("@gerhobbelt/markdown-it-footnote");
  let blockEmbedPlugin         = require("markdown-it-block-embed");
  let markdownBackticks        = require("markdown-it-prism-backticks");
  let markdownMark             = require('markdown-it-mark');
  let markdownAttribution      = require('markdown-it-attribution');

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  let figureOptions = {
    figcaption: true
  }

  // Adding class to in-article lists so they can be styled

  let mapping = {
    ul: 'article-unordered',
    ol:'article-ordered'
  }

  const markdownEngine = markdownIt(options);
  markdownEngine.use(markdownItImplicitFigure, figureOptions);
  markdownEngine.use(markdownItFootnotes);
  markdownEngine.use(blockEmbedPlugin);
  markdownEngine.use(markdownBackticks);
  markdownEngine.use(markdownMark);
  markdownEngine.use(markdownItClass, mapping)
  eleventyConfig.setLibrary("md", markdownEngine);

  //favicon config

  let env = process.env.ELEVENTY_ENV;

      if (env      === "prod") {
      eleventyConfig.addPassthroughCopy({ "./src/_includes/favicon/prod": "/" });
      }
      else if (env === "dev") {
      eleventyConfig.addPassthroughCopy({ "./src/_includes/favicon/dev": "/" });
      }

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

  //SEO
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));

  // Embeds
  eleventyConfig.addPlugin(embedTwitter);
  eleventyConfig.addPlugin(embedYouTube, {
    lite: true,
    embedClass: 'embed youtube'
      });
  eleventyConfig.addPlugin(embedSoundCloud, {
    small: true,
    embedClass: 'embed soundcloud'
  });

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
