#!/usr/bin/env node
const chalk = require('chalk')
const pkg = require('../package.json')
const program  = require('commander')
program.usage('snapshot-cli <option> <command>')
program.addHelpText('beforeAll', `
                                        ##
                                       #####
                                      ######
                                        #####
                                        ######
                                        #######
                                        ########
                                        #########
                                         #########
                                         ##########
                                          ##########
                                            #########
######  ##  #####  ## ######  ## ######  #######  ####
####### ## ####### ## ####### ## ####### #######     ##
##   ## ## ##  ### ## ##  ### ## ##  ### ##  ###      ##
##   ## ## ##   ## ## ##   ## ## ##   ## ##   ##       ##
##   ## ## ##      ## ##  ### ## ##  ### ##   ##         #
##   ## ## ## #### ## ####### ## ####### ##   ##          #
##   ## ## ## #### ## ####### ## ####### ##   ##
##   ## ## ##   ## ## ##   ## ## ##   ## ##   ##
##   ## ## ##   ## ## ##   ## ## ##   ## ##   ##
####### ## ####### ## ####### ## ##   ## #######
######  ##  ###### ## ####### ## ##   ## ######
#####   ##   ###   ## #####   ## ##   ## #####

  `
)

const cmds = require('./commands/index')

console.log(cmds)

program.version(chalk.green(pkg.version),'-v,-version','当前版本号')

program.option('-i,-init', '初始化')


program.action((name, options, command)=>{
    console.log(name)
})

program.helpOption('-h,-help', '获取帮助')

program.parse(process.argv)