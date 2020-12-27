---
title: "Elements in MD"
description: "Testing all possible elements"
date: 2020-12-27
tags: publish
---
# This is a Heading h1

## This is a Heading h2

### This is a Heading h3

#### This is a Heading h4

## Emphasis

*This text will be italic*\
*This will also be italic*

**This text will be bold**\
**This will also be bold**

*You **can** combine them*

## Lists

### Unordered

* Item 1
* Item 2

  * Item 2a
  * Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3

   1. Item 3a
   2. Item 3b

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
> > Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Inline code

This web site[^1] is using `markedjs/marked`.

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

---

## Code block

```js
const htmlmin = require("html-minifier");
const yaml = require("js-yaml");
const { DateTime } = require("luxon");
```