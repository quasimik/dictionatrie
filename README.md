# dictionatrie
Build and search a minimalist dictionary trie

## Usage

```javascript
// Initialization
const Dictionary = require("dictionatrie");
const dictionary = new Dictionary(); // defaults to words in Yet Another Word List (YAWL)
const customDictionary = new Dictionary([ "cat", "dog", "llama" ]); // custom dictionary

// Search for complete match
var match1 = dictionary.has("uncontroversially"); // true
var match2 = customDictionary.has("llama"); // true
var match3 = dictionary.has("uncontroversiall"); // false: no complete match
var match4 = customDictionary.has("uncontroversially"); // false: no such word in custom dictionary

// Search for partial match (add a "true" flag)
var match5 = dictionary.has("uncontroversially", true); // true
var match6 = dictionary.has("uncontroversiall", true); // true
```
