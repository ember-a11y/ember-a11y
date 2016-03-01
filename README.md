# ember-a11y

[![Build Status](https://travis-ci.org/nathanhammond/ember-a11y.svg)](https://travis-ci.org/nathanhammond/ember-a11y)
[![npm version](https://badge.fury.io/js/ember-a11y.svg)](http://badge.fury.io/js/ember-a11y)
[![Ember Observer Score](http://emberobserver.com/badges/ember-a11y.svg)](http://emberobserver.com/addons/ember-a11y)
[![Code Climate](https://codeclimate.com/github/nathanhammond/ember-a11y/badges/gpa.svg)](https://codeclimate.com/github/nathanhammond/ember-a11y)

This Ember addon provides a `{{focusing-outlet}}` component which you can use in in place of your normal outlers.

## Usage

`ember install ember-a11y`

In your templates you would then swap in `{{focusing-outlet}}` for `{{outlet}}` wherever it may occur.

## Running the sample application

The included sample application contains a demo for testing.

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Also available via GitHub Pages [http://nathanhammond.github.io/ember-a11y/](http://nathanhammond.github.io/ember-a11y/)

## Running Tests

* `npm run test`

## Pushing an updated sample app

```sh
ember github-pages:commit --message "Update demo application."
git push
```
