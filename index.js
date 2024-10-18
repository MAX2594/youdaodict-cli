#!/usr/bin/env node

import axios from 'axios'
import chalk from 'chalk'
import {Spinner} from 'cli-spinner'
import isChinese from 'is-chinese'
import urlencode from 'urlencode'
import {noCase} from 'no-case'
import config from './lib/config.js'
import Parser from './lib/parser.js'

let word = process.argv.slice(2).join(' ')
if (!word) {
	console.log('Usage: yd <WORD_TO_QUERY>')
	process.exit()
}

const spinner = new Spinner('正在查询翻译... %s')

if (config.spinner) {
	spinner.setSpinnerString('|/-\\')
	spinner.start()
}

const isCN = isChinese(word)

word = isCN ? word : noCase(word)

const options = {
	'url': config.getURL(word) + urlencode(word),
	'proxy': config.proxy || null
}

const ColorOutput = (txt) => chalk[config.color](txt)

axios.get(options.url).then((response) => {
	if (config.spinner) {
		spinner.stop(true)
	}
	console.log(ColorOutput(Parser.parse(isCN, response.data)))
}).catch((error) => {
	console.error(error)
})
