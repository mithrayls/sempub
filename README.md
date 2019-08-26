# Sempub
*increments semantic version, pushes to git, and publishes to NPM*

I don't recommend using this yet. There still seem to be a lot of bugs.

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

### Release 0.0.29

fixed release notes bug

### Release 0.0.30

made npm publish use public access flag by default
