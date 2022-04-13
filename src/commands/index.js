import Init from './init'
import Snapshot from './snapshot'

export const options = [
    {
        cmd: '-i,-init',
        description: '初始化',
        key: 'Init',
        fn: Init
    }, {
        cmd: '-v,-version',
        description: '获取版本',
        key:'Version'
    }, {
        cmd: '-h,-help',
        description: '获取帮助',
        key: 'Help'
    },
    {
        cmd: '-s,-snapshot',
        description: '发布镜像版本',
        key: 'Snapshot',
        fn: Snapshot
    }
]

export default function (name, opt, command) {
    const key = Object.keys(name)[0]
    const node = options.find(row => row.key === key)
    if(node && node.fn) {
        node.fn()
    }
}