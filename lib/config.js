import Configstore from 'configstore'
import isChinese from 'is-chinese'
import fs from 'fs'
// import pkg from '../package.json' with { type: 'json' }

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const conf = new Configstore(pkg.name, { color: 'white', spinner: true })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	spinner: conf.get('spinner'),
	color: conf.get('color'),
	getURL: function (word) {
		return isChinese(word) ? 'https://dict.youdao.com/w/eng/' : 'https://dict.youdao.com/w/'
	}
}

export default config