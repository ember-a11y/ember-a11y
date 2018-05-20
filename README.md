# ember-a11y
[![Build Status](https://travis-ci.org/ember-a11y/ember-a11y.svg)](https://travis-ci.org/ember-a11y/ember-a11y)
[![npm version](https://badge.fury.io/js/ember-a11y.svg)](http://badge.fury.io/js/ember-a11y)
[![Ember Observer Score](http://emberobserver.com/badges/ember-a11y.svg)](http://emberobserver.com/addons/ember-a11y)
[![Code Climate](https://codeclimate.com/github/ember-a11y/ember-a11y/badges/gpa.svg)](https://codeclimate.com/github/ember-a11y/ember-a11y)

This Ember addon provides a `{{focusing-outlet}}` component which you can use in place of normal `{{outlet}}`s.

The current implementation of this addon will immediately apply focus to the most relevant piece of content based on actions users take (clicking buttons, links, etc). This allows screen readers to catch changes and read the right information, thus providing a much better experience for blind users.

## Usage

`ember install ember-a11y`

In your templates you would then swap in `{{focusing-outlet}}` for `{{outlet}}` wherever it may occur.

[You also need to ensure that your application's router is not set to use `locationType: 'hash'`.](https://github.com/ember-a11y/ember-a11y/issues/2) Set `ENV.locationType` appropriately inside of `config/environment.js`.

## Ember version compatibility


| ember version | ember-a11y version | 
|-----|-----|
| <= 2.8 | 0.1.15 |
| > 2.8  | latest  |

## Demo Application

Included in this addon is a demo application for testing `ember-a11y`.

You can access it through [Github Pages](http://ember-a11y.github.io/ember-a11y/) or build it from source
files with the following steps:

* run `ember server`
* Visit the demo app at [http://localhost:4200](http://localhost:4200).

### Using a Screen Reader

Many of the examples in the demo app are meant to be used alongside a screen reader. A few of our suggestions:

* [VoiceOver](http://www.apple.com/accessibility/osx/voiceover/) (macOS)
* [JAWS](http://www.freedomscientific.com/Products/Blindness/JAWS)  (Windows)
* [TalkBack](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback) (Android)
- [ChromeVox](http://www.chromevox.com/) (ChromeOS)
  + Also, check out [ChromeVox Next](http://www.chromevox.com/next.html)
* [NVDA](http://www.nvaccess.org/) (Windows)

## Commands

* `npm run test` - Run all tests.
* `npm run demo` - Publish an updated demo app.
