import fs from 'fs'
import Chalk from 'chalk'
import Shell from 'shelljs'
import Util from '../util/index'

function publish(root, tag) {
    const cmd = `npm publish --tag ${tag}`
    return new Promise(r => {
        Shell.cd(root)
        Shell.exec(cmd,{silent:true}, function(code, stdout, stderr) {
            r(true)
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

/**
 * 恢复package.json
 * @param {*} snapshots 
 * @returns 
 */
function restorePkg(snapshots) {
    Object.keys(snapshots).forEach(key => {
        const item = snapshots[key]
        if(!item) return false
        const { buffer, path } = item
        fs.writeFileSync(path, buffer.toString())
        return false
    })
}

/**
 * 修改package.json version为快照版本
 * @param {*} snapshots 
 * @returns 
 */
function editPkg(snapshots) {
    Object.keys(snapshots).forEach(key => {
        const item = snapshots[key]
        if(!item) return false
        const { editPkg, path } = item
        fs.writeFileSync(path, JSON.stringify(editPkg))
        return false
    })
}


export default async function () {
    if(!Util.checkOptionFile()) return
    const snapshots = Util.snapshotJson()
    const removeFn = []
    const pubFn = []
    Object.keys(snapshots).forEach(key => {
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
        removeFn.push(unPublishPkg(key, '0.0.1-snapshot'))
        pubFn.push(publish(root, 'snapshot'))
    })
    if(removeFn.length > 0) {
        console.log(Chalk.blue('删除快照版本...'))
        await Promise.all(removeFn)
    }
    console.log(Chalk.blue('修改为快照版本...'))
    editPkg(snapshots)
    if(pubFn.length > 0) {
        await Promise.all(pubFn)
    }
    setTimeout(() => {
        console.log(Chalk.blue('恢复默认...'))
        restorePkg(snapshots)
    }, 5000)
}