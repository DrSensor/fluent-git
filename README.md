# Fluent Git

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![size][size]][size-url]
[![npm][npm-download]][npm-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]

Features:

- [x] git-notes basic subcommand (add, remove, show, etc) with handler:
  - [x] atCommit()
  - [x] atFile()
  - [x] atFolder()
  - [ ] atSubmodule()
  - [ ] atTag()
- [ ] git-log...
  - [ ] search and list notes
  - [ ] search and list commit
- [ ] git-checkout...
- [ ] git-hooks...

### Getting Started

To begin, you'll need to install `fluent-git`:

```console
npm install fluent-git
```

or if you use yarn

```console
yarn add fluent-git
```

## git-notes <sup><sup>[[man](https://git-scm.com/docs/git-notes)]</sup><sup>

<sup><sup>tl;dr -- see example on each [operation](#operation) or [handler](#handler)</sup></sup>

```ts
import { notes } from "fluent-git";
```

`notes([text|][,options])` is a function that take 2 arguments and both of them are optional:

- `text` - `string` that can be either SHA-1, `HEAD`, or notes.
- `options` - `string` that point to [--ref][]. Or `Object` which represent the [Options](#options).

<details>
<summary>When <code>text</code> is <code>undefined</code></summary>

```ts
notes()[handler](...)[operation](...)
// or
notes({
  ...Options
})[handler](...)[operation](...)

// in case you need autocompletion in typescript
const $notes = notes() as NoteUse.Manually
```

- Available operation: `add`, `overwriteWith`, `copyFrom`, `append`, `remove`, `show`
- Available handler: `at`, `atCommit`, `atFile`, `atFolder`
  </details>

<details>
<summary>When <code>text</code> is a notes (not identified as string <code>HEAD</code> or hash)</summary>

```ts
notes('some long notes')[operation][handler](...)

// in case you need autocompletion in typescript
const $notes = notes('some long notes') as NoteUse.Text
```

- Available operation: `add`, `overwrite`, `copy`, `append`
- Available handler: `at`, `atCommit`, `atFile`, `atFolder`
  </details>

<details>
<summary>When <code>text</code> is a hash string</summary>

```ts
const sha = '69f3c3d' // or 'HEAD'
notes(sha)[operation](...)

// in case you need autocompletion in typescript
const $notes = notes('69f3c3d') as NoteUse.Hash
```

- Available operation: `add`, `overwriteWith`, `copyFrom`, `append`, `remove`, `show`
- Available handler: `at`, `atCommit`, `atFile`, `atFolder`
  </details>

### Operation

<details><summary><b><code>add</code></b></summary>
Add notes on specific git-object (commit, blob/file, tree/folder, submodule, or tag)

- Arguments: `string`
- Expected value: any string that represent notes but it **can not** be hash string or word `HEAD`
- Return: ~

Example

```js
notes().at(sha).add("some long notes");
notes("some long notes").add.at(sha);
notes("af23339").add("some long notes");
```

</details>

<details><summary><b><code>remove</code></b></summary>
Remove notes on specific git-object (commit, blob/file, tree/folder, submodule, or tag)

- Arguments: ~
- Expected value: ~
- Return: ~

Example

```js
notes().at(sha).remove();
notes("af23339").remove();
```

</details>

<details><summary><b><code>show</code></b></summary>
Read notes on specific git-object (commit, blob/file, tree/folder, submodule, or tag)

- Arguments: ~
- Expected value: ~
- Return: `string`

Example

```js
mynotes1 = notes().at(sha).show();
mynotes2 = notes("af23339").show();
console.log(String(mynotes1 + "\n" + mynotes2));
```

</details>

<details><summary><b><code>append</code></b></summary>
Append notes on specific git-object (commit, blob/file, tree/folder, submodule, or tag) that has/hasn't a notes.

- Arguments: `string`
- Expected value: any string that represent notes but it **can not** be hash string or word `HEAD`
- Return: ~

Example

```js
notes().at(sha).append("some long notes");
notes("some long notes").append.at(sha);
notes("af23339").append("some long notes");
```

</details>

<details><summary><b><code>overwrite</code></b> or <b><code>overwriteWith</code></b></summary>
Overwrite notes on specific git-object (commit, blob/file, tree/folder, submodule, or tag). The source can be notes on another git-object or provided manually

- Arguments: `string`
- Expected value: any string that represent notes, hash string, or word `HEAD`
- Return: ~

Example

```js
const sourceNotes = "HEAD";
notes().at(sha).overwriteWith("some long notes");
notes().at(sha).overwriteWith(sourceNotes);
notes("some long notes").overwrite.at(sha);
notes("af23339").overwriteWith("some long notes");
notes("af23339").overwriteWith(sourceNotes);
```

</details>

<details><summary><b><code>copy</code></b> or <b><code>copyFrom</code></b></summary>
Copy notes from git-object (commit, blob/file, tree/folder, submodule, or tag) to another git-object.

- Arguments: `string`
- Expected value: must be hash string or word `HEAD`
- Return: ~

Example

```js
notes().at(sha).copyFrom("b0279ab");
notes("some long notes").copy.at("af23339"); // same as `add` operation
notes("af23339").copyFrom("b0279ab");
```

</details>

### Handler

<details><summary><b><code>at(sha)</code></b></summary>

- Arguments: `string`
- Expected value: must be hash string or word `HEAD`

Example

```js
notes().at("af23339").show();
notes().at("HEAD").show();
```

</details>

<details><summary><b><code>atCommit(message)</code></b></summary>

- Arguments: `string`
- Expected value: must be valid commit message

Example

```js
notes().atCommit("Initial commit").show();
```

</details>

<details><summary><b><code>atFile(filename, commit)</code></b></summary>

- Arguments:
  - filename - `string`
  - commit - `string`
- Expected value:
  - commit - commit message or commit-id (SHA-1)
  - filename - a valid filename of that specific commit. Can include relative path (without `./`) but not with absolute path

Example

```js
notes().atFile("README.md", "Initial commit").show();
notes().atFile("README.md", "af23339").show();
notes().atFile("packages/mod1/README.md", "HEAD").show();
```

</details>

<details><summary><b><code>atFolder(folder, commit)</code></b></summary>

- Arguments:
  - folder - `string`
  - commit - `string`
- Expected value:
  - commit - commit message or commit-id (SHA-1)
  - folder - a valid folder of that specific commit. Must be relative path without prefix `./` and suffix '/'

Example

```js
notes().atFolder("src", "Initial commit").show();
notes().atFolder("src", "af23339").show();
notes().atFolder("packages/mod1/src", "HEAD").show();
```

</details>

### Options

The options are the combination of [execa options][] plus this:

```ts
{
  ref: String; // represent flag --ref in git-notes
}
```

[execa options]: https://github.com/sindresorhus/execa#options
[--ref]: https://git-scm.com/docs/git-notes#git-notes---refltrefgt

## Who use this?

- [guc-desktop](https://github.com/g-u-c/guc-desktop)
- [add yours 😉]

## Contributing

- [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for how you can make contribution
- [HACKING.md](./.github/HACKING.md) for technical details

---

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDrSensor%2Ffluent-git.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDrSensor%2Ffluent-git?ref=badge_large)

[npm]: https://img.shields.io/npm/v/fluent-git.svg
[npm-url]: https://npmjs.com/package/fluent-git
[npm-download]: https://img.shields.io/npm/dm/fluent-git.svg
[node]: https://img.shields.io/node/v/fluent-git.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/DrSensor/fluent-git.svg
[deps-url]: https://david-dm.org/DrSensor/fluent-git
[tests]: https://circleci.com/gh/DrSensor/fluent-git/tree/master.svg?style=shield
[tests-url]: https://circleci.com/gh/DrSensor/fluent-git/tree/master
[cover]: https://codecov.io/gh/DrSensor/fluent-git/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/DrSensor/fluent-git/branch/master
[size]: https://packagephobia.now.sh/badge?p=fluent-git
[size-url]: https://packagephobia.now.sh/result?p=fluent-git
