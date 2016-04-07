# ember-a11y

[![Build Status](https://travis-ci.org/ember-a11y/ember-a11y.svg)](https://travis-ci.org/ember-a11y/ember-a11y)
[![npm version](https://badge.fury.io/js/ember-a11y.svg)](http://badge.fury.io/js/ember-a11y)
[![Ember Observer Score](http://emberobserver.com/badges/ember-a11y.svg)](http://emberobserver.com/addons/ember-a11y)
[![Code Climate](https://codeclimate.com/github/ember-a11y/ember-a11y/badges/gpa.svg)](https://codeclimate.com/github/ember-a11y/ember-a11y)

This Ember addon provides a `{{focusing-outlet}}` component which you can use in place of normal `{{outlet}}`s.

## Usage

`ember install ember-a11y`

In your templates you would then swap in `{{focusing-outlet}}` for `{{outlet}}` wherever it may occur.

## Demo Application

Included in this addon is a demo application for testing.

* `ember server`
* Visit the demo app at [http://localhost:4200](http://localhost:4200).
* Also available via GitHub Pages [http://ember-a11y.github.io/ember-a11y/](http://ember-a11y.github.io/ember-a11y/)

## Commands

* `npm run test` - Run all tests.
* `npm run demo` - Publish an updated demo app.
