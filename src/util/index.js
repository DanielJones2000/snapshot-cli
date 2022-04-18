import { resolve } from 'path'
import fs from 'fs'
import Chalk from 'chalk'

function checkOptionFile() {
	const rootPath = resolve('./')
	const exist = fs.existsSync(`${rootPath}\\snapshot.js`)
	if (!exist) {
		console.log(
			Chalk.red(
				'配置文件不存在! 可使用命令 `snapshot-cli -i` 进行初始化!'
			)
		)
	}
	return exist
}

function snapshotJson() {
	const rootPath = resolve('./')
	return require(`${rootPath}/snapshot.js`)
}

export default {
	checkOptionFile,
	snapshotJson,
}
