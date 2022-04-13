import { resolve } from 'path'
import fs from 'fs'
import Chalk from 'chalk'
import Shell from 'shelljs'

function execVersion(key) {
    return new Promise(r => {
        const cmd = `npm view ${key}@latest version`
        Shell.exec(cmd,{silent:true}, function(code, stdout, stderr) {
            r({
                key,
                version: stdout.replace('\n','')
            })
        })
    })
}


export default async function () {
    const rootPath = resolve('./')
    const exist = fs.existsSync(`${rootPath}/snapshot.js`)
    if(!exist) {
        console.log(Chalk.red('配置文件不存在! 可使用命令 `snapshot-cli -i` 进行初始化!'))
        return
    }
    const snapshots = require(`${rootPath}/snapshot.js`)
    const promiseFn = []
    Object.keys(snapshots).forEach(key => {
        promiseFn.push(execVersion(key))
    })
    const result = await Promise.all(promiseFn)
    console.log(result)
}