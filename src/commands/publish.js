import fs from 'fs'
import Chalk from 'chalk'
import Shell from 'shelljs'
import Util from '../util/index'
import Env from '../env'
import { resolve } from 'path'

function publish(root, tag) {
	const cmd = `npm publish --tag ${tag}`
	return new Promise((r) => {
		Shell.cd(root)
		Shell.exec(cmd, { silent: true }, function () {
			r(true)
		})
	})
}

/**
 * 根据末尾版本号删除远程仓库的包
 */
function unPublishPkg(key, version) {
	return new Promise((r) => {
		const cmd = `npm unpublish ${key}@${version}`
		Shell.exec(cmd, { silent: true }, function (code, stdout, stderr) {
			r(true)
		})
	})
}

export default async function () {
	if (!Util.checkOptionFile()) return
	const snapshots = Util.snapshotJson()
	const rootPath = resolve('./')
	Object.keys(snapshots).forEach((key) => {
		const { src } = snapshots[key]
		const root = `${rootPath}/${src}`
		const path = `${root}/package.json`
		const buffer = fs.readFileSync(path)
		const pkg = JSON.parse(buffer)
		pkg.version = Env.TAG_VERSION
		unPublishPkg(key, Env.TAG_VERSION).then(() => {
			console.log(Chalk.blue(`完成 ${key} 快照版本的清除!`))
			fs.writeFileSync(path, JSON.stringify(pkg))
			console.log(
				Chalk.blue(`发布新的快照版本,${key} : ${Env.TAG_VERSION}!`)
			)
			publish(root, Env.TAG).then(() => {
				fs.writeFileSync(path, buffer.toString())
			})
		})
	})
}
