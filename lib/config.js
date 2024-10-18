import Configstore from 'configstore'
import isChinese from 'is-chinese'

const conf = new Configstore('youdaodict-cli', { color: 'white', spinner: true })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	spinner: conf.get('spinner'),
	color: conf.get('color'),
	getURL: function (word) {
		return isChinese(word) ? 'https://dict.youdao.com/w/eng/' : 'https://dict.youdao.com/w/'
	}
}

export default config