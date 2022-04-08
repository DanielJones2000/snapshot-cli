const options = [
    {
        cmd: '-i,init',
        description: '初始化',
        fn: 'Init'
    }, {
        cmd: '-v,-version',
        description: '获取版本',
        fn:'Version'
    }, {
        cmd: '-h,-help',
        description: '获取帮助',
        fn: 'Help'
    }
]

exports.module = () => {
    return {
        options
    }
}