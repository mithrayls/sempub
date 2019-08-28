# Sempub

## Introduction

*increments semantic version, pushes to git, and publishes to NPM*

I DON'T RECOMMEND USING THIS YET! PLEASE WAIT FOR VERSION 1.0.0 !!!🚨⚠️🔥⚡🚨⚠️🔥⚡🚨⚠️🔥⚡

If you are trying to get this working, you will most likely need to npm init and have your git remote set up already.

## Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Release Notes](#release-notes)
* [Roadmap](#roadmap)

## Installation

```bash
npm i sempub -g
```

## Usage

### Initialization

Initialization will walk you through a prompt to define what the command should do each time it is run. If you want to change the settings at any time, just run it again.

```bash
sempub init
```

### Publish

```bash
# will prompt for commit message
sempub publish

# will not prompt for commit message
sempub publish --message "commit message"
```

## Analyze Project

* Dependency Graph
* Complexity Analysis(to come)

![Alt text](https://raw.githubusercontent.com/mithrayls/sempub/master/dependencies.svg?sanitize=true)

## Roadmap

- [ ] Streamline init
  - [ ] git init
  - [ ] npm init
- [ ] Testing
  - [ ] More Testing
  - [ ] Mocha
- [ ] Distribution
  - [ ] Flexible adapting CI/CD chain
  - [ ] Git push to multiple urls
  - [ ] Use alternate package manager
- [ ] Documentation & Analysis
  - [ ] Linting
  - [ ] Code Complexity
  - [ ] UML Diagrams
  - [x] Shortcode emojis in release notes
- [ ] Hints
  - [x] CLI markdown prompts
  - [ ] Toggle hints with cli flag 
  - [ ] Toggle hints with init config
  - [ ] Make hints for every prompt
    - [ ] Initialize
    - [x] Git commit message
    - [x] Release Notes
    - [ ] Release Type
    - [ ] Confirm Publication

## Release Notes

### Release 0.1.36

* include dependency graph

### Release 0.1.35

* Include SVG dependency generator

### Release 0.1.34

* Include svg dependency generator

### Release 0.1.33

* update

### Release 0.1.32

* update

### Release 0.1.31

* update

### Release 0.1.30

* Trim whitespace from outgoing git commit messages

### Release 0.1.28

* Tidy README.md

### Release 0.1.27

* Fix emoji shortcodes not working 😀

### Release 0.1.26

* Add commit hint 😀
* Fix release notes not creating list

### Release 0.1.25

* Add CLI markdown prompt

### Release 0.1.24

* Add roadmap
* Improve README.md structure

### Release 0.1.22

* Fix release notes spacing bug

### Release 0.1.19

* Simplify initialization logic using inquirer's confirm type

### Release 0.1.11

* Fix unnecessary $ operator being interpreted as literal

### Release 0.1.10

* Modify git commit message prompt to use editor, for multiline commits
* Fix release notes adding too many spacings

### Release 0.1.7

* Clean README.md
