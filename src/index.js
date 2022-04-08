#!/usr/bin/env node
const chalk = require('chalk')
const { Command } = require('commander')
const pkg = require('../package.json')

const program = new Command()
program.version(chalk.green(pkg.version),'-v,-version','output the current version')
program.parse(process.argv)