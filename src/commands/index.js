import Init from './init'
import Publish from './publish'
import PkgVersionList from './pkg-version-list'

export const options = [
	{
		cmd: '-i,-init',
		description: '初始化',
		key: 'Init',
		fn: Init,
	},
	{
		cmd: '-v,-version',
		description: '获取版本',
		key: 'Version',
	},
	{
		cmd: '-h,-help',
		description: '获取帮助',
		key: 'Help',
	},
	{
		cmd: '-p,-publish',
		description: '发布镜像版本',
		key: 'Publish',
		fn: Publish,
	},
	{
		cmd: '-l,-list',
		description: '查询已发布的末尾版本列表',
		key: 'List',
		fn: PkgVersionList,
	},
	{
		cmd: '-s,-sync',
		key: 'Sync',
	},
]

export default function (name, opt, command) {
	const key = Object.keys(name)[0]
	const node = options.find((row) => row.key === key)
	if (node && node.fn) {
		node.fn()
	}
}
