# Setup

This file contains instructions to install and run the prototype.

## Requirements
Prior to installation, you need the basics:
* ruby 2.1.5
* python 3.x
* bundler
* PhantomJS 
  * See http://phantomjs.org/download.html
  * Note: the phantom team has not put out an NPM package, which is anticipated in version 2.1 https://github.com/Medium/phantomjs/issues/288
* nodejs & nodejs-legacy
  * `sudo apt-get install nodejs` and `sudo apt-get install nodejs-legacy`

## Installation
*Windows Users should perform the following steps using the Git Shell*

1. `npm install`
2. `rake db:reset`
3. `rake bower:install`

## Python Setup (one-time)
1. `cd gruve`
2. `python setup.py develop` (or `sudo python setup.py develop`)

Note: if you have multiple versions, you may need to specify python 3.x 
(i.e. `sudo python3.4 setup.py develop`)

## Running Tests

* rspec `bundle exec rspec` (ruby unit tests, request specs, full stack feature specs)
* python `cd gruve then sudo python3.4 setup.py test` (unit tests for ETL scripts) - note: other python 3.x versions can be specified
* javascript `bundle exec rake teaspoon` (angular unit tests)