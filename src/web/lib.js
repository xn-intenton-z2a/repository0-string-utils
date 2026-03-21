// SPDX-License-Identifier: MIT
// src/web/lib.js — re-export the library for the browser demo
export {
  name,
  version,
  description,
  getIdentity,
  slugify,
  truncate,
  camelCase,
  kebabCase,
  titleCase,
  wordWrap,
  stripHtml,
  escapeRegex,
  pluralize,
  levenshtein,
} from "../lib/main.js";
