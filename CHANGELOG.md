# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.1.1

### Fixed

- Improved documentation

## v1.1.0

`v1.1.0` is a port to Typescript of the original Javascript code. The behavior of the code and the way it is imported has not changed.

### Added

- Everything is now exported from the root, so you can import `import { createMockClock, createWarpClock } from "@nvnh/clock";` instead of `import { createMockClock } from "@nvnh/clock/mock` or `import { createWarpClock } from "@nvnh/clock/warp`. You can still do the latter if you prefer importing only what you need.

### Fixed

- The source code is now in Typescript, so the typings have been fixed. Your IDE will provide full support.

## v1.0.0

First production-ready release.
