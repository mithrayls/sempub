# Sempub
*increments semantic version, pushes to git, and publishes to NPM*

I DON'T RECOMMEND USING THIS YET! PLEASE WAIT FOR VERSION 1.0.0 !!!🚨⚠️🔥⚡🚨⚠️🔥⚡🚨⚠️🔥⚡
IF YOU DO YOUR S WILL POTENTIALLY BREAK LOL 🔥

If you are trying to get this working, you will most likely need to npm init and have your git remote set up already.

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

### Hint

Hints for commit messages [Seven Rules of a great Git commit message](https://chris.beams.io/posts/git-commit/)

* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how

## Release Notes

### Release 0.1.23

spacing

### Release 0.1.22

finally fixed release notes spacing bug

### Release 0.1.21

aoneuh

### Release 0.1.20

addantehu

### Release 0.1.19

simplify initialization logic using inquirer's confirm type

### Release 0.1.11

fix unnecessary $ operator being interpreted as literal

### Release 0.1.10

modify git commit message prompt to use editor, for multiline commits
fix release notes adding too many spacings

### Release 0.1.9

release notes uses single spacing

### Release 0.1.8

fixed release note position error

### Release 0.1.7

clean README
