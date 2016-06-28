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

## Demo Application

Included in this addon is a demo application for testing.

* `ember server`
* Visit the demo app at [http://localhost:4200](http://localhost:4200).
* Also available via GitHub Pages [http://ember-a11y.github.io/ember-a11y/](http://ember-a11y.github.io/ember-a11y/)

## Commands

* `npm run test` - Run all tests.
* `npm run demo` - Publish an updated demo app.
