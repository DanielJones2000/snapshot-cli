import { resolve } from 'path'
import fs from 'fs'
import Chalk from 'chalk'
import Shell from 'shelljs'

/**
 * 查询末尾版本号
 * @param {*} key 
 * @returns 
 */
function execVersion(key) {
    return new Promise(r => {
        const cmd = `npm view ${key}@snapshot version`
        Shell.exec(cmd,{silent:true}, function(code, stdout, stderr) {
            r({
                key,
                version: stdout.replace('\n','')
            })
        })
    })
}

/**
 * 根据末尾版本号删除远程仓库的包
 */
function unPublishPkg(key,version) {
    return new Promise(r => {
        const cmd = `npm unpublish ${key}@${version}`
        Shell.exec(cmd,{silent:true}, function(code, stdout, stderr) {
            r(true)
        })
    })
}

function editPkg(snapshots) {
    if(Object.keys(snapshots).length === 0) return
    Object.keys(snapshots).forEach(key => {
        const item = snapshots[key]
        if(!item) return false
        const { editPkg, path } = item
        fs.writeFileSync(path, JSON.stringify(editPkg))
        return false
    })

    Object.keys(snapshots).forEach(key => {
        const item = snapshots[key]
        if(!item) return false
        const { buffer, path } = item
        fs.writeFileSync(path, buffer.toString())
        return false
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
    let promiseFn = []
    Object.keys(snapshots).forEach(key => {
        promiseFn.push(unPublishPkg(key, '0.0.1-snapshot'))
        const { src } = snapshots[key]
        const root = `${rootPath}/${src}`
        const path = `${root}/package.json`
        const buffer = fs.readFileSync(path)
        const pkg = JSON.parse(buffer)
        pkg.version = '0.0.1-snapshot'
        snapshots[key].root = root
        snapshots[key].path = path
        snapshots[key].buffer = buffer
        snapshots[key].editPkg = pkg
    })
    if(promiseFn.length > 0) {
        console.log(Chalk.blue('删除快照版本...'))
        await Promise.all(promiseFn)
    }
    editPkg(snapshots)
}