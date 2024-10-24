import * as cheerio from 'cheerio'

let parser = {}
parser.parse = function (isChinese, body) {
	const $ = cheerio.load(body)
	let result = ''
	let sentenceSample = ''
	if (isChinese) {
		$('div.trans-container > ul').find('p.wordGroup').each(function (i, elm) {
			result += $(this).text().replace(/\s+/g, ' ')
		})
	} else {
		$('div#phrsListTab > div.trans-container > ul').find('li').each(function (i, elm) {
			result += $(this).text().replace(/\s+/g, ' ') + '\n'
		})
		$('#bilingual ul li').find('p').each(function (i, elm) {
			if ($(this).attr('class') !== 'example-via') {
				sentenceSample += $(this).text().trim() + '\n'
			}
		})
	}
	// phrase or sentence
	if (result === '') {
		result = $('div#webPhrase > p.wordGroup').text() !== '' ? $('div#webPhrase > p.wordGroup').text() : $('div#fanyiToggle > div.trans-container > p:nth-child(2)').text()
	}
	// phonetic
	result = $('div#phrsListTab > h2.wordbook-js > div.baav > span').text().replace(/\s+/g, ' ') +
       '\n\n' + result + '\n' + sentenceSample
	// remove leading and trailing spaces
	result = '\n' + result.replace(/(^\s*)|(\s*$)/g, '') + '\n'
	return result
}
export default parser
