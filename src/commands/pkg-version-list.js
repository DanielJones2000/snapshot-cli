import Util from '../util/index'
import Chalk from 'chalk'
import Shell from 'shelljs'
import Env from '../env'

/**
 * 查询末尾版本号
 * @param {*} key 
 * @returns 
 */
 function execVersion(key) {
    return new Promise(r => {
        const cmd = `npm view ${key}@${Env.TAG} version`
        Shell.exec(cmd, {silent:true}, function(code, version, stderr) {
            r({
                key,
                version:version.replace('\n','')
            })
        })
    })
}

export default () => {
    if(!Util.checkOptionFile()) return
    const snapshots = Util.snapshotJson()
    const list = []
    Object.keys(snapshots).forEach(key => {
        list.push(execVersion(key))
    })
    Promise.all(list).then(data => {
        data.forEach(item => {
            console.log(Chalk.blue(`${item.key} : ${item.version}`))
        })
    })
}