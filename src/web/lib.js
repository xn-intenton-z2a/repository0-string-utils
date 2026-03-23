// SPDX-License-Identifier: MIT
// Browser entry point for the web demo — re-export the library functions.
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
  levenshtein
} from "../lib/main.js";
