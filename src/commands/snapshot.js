import { resolve } from 'path'
import fs from 'fs'
import Chalk from 'chalk'

export default () => {
    const rootPath = resolve('./')
    const exist = fs.existsSync(`${rootPath}/snapshot.js`)
    if(!exist) {
        console.log(Chalk.red('配置文件不存在! 可使用命令 `snapshot-cli -i` 进行初始化!'))
        return
    }
    const snapshots = require(`${rootPath}/snapshot.js`)
    console.log(snapshots)
}