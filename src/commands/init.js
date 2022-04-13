import { resolve } from 'path'
import fs from 'fs'
import Chalk from 'chalk'

export default function () {
    const rootPath = resolve('./')
    const exist = fs.existsSync(`${rootPath}/snapshot.js`)
    if(exist) {
        console.log(Chalk.red('根目录下snapshot.js文件已存在!'))
        return
    }
    fs.copyFileSync(`${__dirname}/../template/snapshot.js`,'./snapshot.js')
    if(fs.existsSync(`${rootPath}/snapshot.js`)) {
        console.log(Chalk.green('Success !'))
    }
}