#!/usr/bin/env node
import Pkg from '../package.json'
import CmdAction, { options } from './commands/index'
import Chalk from 'chalk'
import { program } from 'commander'
import Logo from './logo'

program.usage('snapshot-cli <option> <command>')
program.addHelpText('beforeAll', Chalk.blue(Logo))

options.forEach(({ key, cmd, description }) => {
	if (key === 'Version') {
		program.version(Chalk.green(Pkg.version), cmd, description)
	} else if (key === 'Help') {
		program.helpOption(cmd, description)
	} else {
		program.option(cmd, description)
	}
})

program.action(CmdAction)
program.parse(process.argv)
