import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
let tags = {
  'main': 'Main',
  'game': 'Game',
  'rpg': 'RPG Games',
  'xp': 'Exp & Limit',
  'sticker': 'Sticker',
  'kerang': 'Kerang Ajaib',
  'quotes': 'Quotes',
  'group': 'Group',
  'premium': 'Premium',
  'internet': 'Internet',
  'anonymous': 'Anonymous Chat',
  'nulis': 'MagerNulis & Logo',
  'anime': 'Anime',
  'nsfw': 'NSFW',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'fun': 'Fun',
  'quran': 'Al Qur\'an',
  'owner': 'Owner',
  'advanced': 'Advanced',
  'info': 'Info',
  'general': 'General',
}
const defaultMenu = {
  before: `
โญโโใ ๐๐ก๐ ๐๐ฒ๐ฌ๐ญ๐ข๐ - ๐๐จ๐ญ ใโโฎ
โ ๐๐ป ๐ท๐พ๐ป๐ฐ %name!
โ 
โ ๐ ๐ต๐ด๐ฒ๐ท๐ฐ: *%week, %date*
โ ๐ฐ๏ธ ๐ท๐พ๐๐ฐ: *%time*
โ
โ ๐ ๐๐ธ๐ด๐ผ๐ฟ๐พ ๐ฐ๐ฒ๐๐ธ๐๐พ: *%uptime*
โ ๐ ๐๐๐๐ฐ๐๐ธ๐พ๐: *%rtotalreg*
โฐโโเงกเงขอกอโฆโโก๐คโโโเงกเงขอกอโฆโโฏ
%readmore`.trimStart(), 
  header: 'โญโใ %category ใโโฎ',
  body: 'โโง %cmd %islimit %isPremium',
  footer: 'โฐโโโโโก๐ฅโโโโโโฏ\n',
  after: `
*%npmname* | %version
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let vn = './media/menu.mp3'
    const pp = './Menu2.jpg'
    conn.sendHydrated(m.chat, text.trim(), '๐๐๐ ๐ผ๐ข๐๐๐๐ - ๐ฑ๐๐', pp, 'https://github.com/BrunoSobrino/TheMystic-Bot-MD', '๐ถ๐ธ๐๐ท๐๐ฑ', null, null, [
      ['๐ณ๐พ๐ฝ๐ฐ๐', '/donasi'],
      ['๐พ๐๐ฝ๐ด๐', '/owner']
    ], m,)
    await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, {
    type: 'audioMessage', 
    ptt: true 
})
  } catch (e) {
    conn.reply(m.chat, '*[โ๐๐๐๐โ] ๐ด๐ป ๐ผ๐ด๐ฝ๐ ๐๐ธ๐ด๐ฝ๐ด ๐๐ฝ ๐ด๐๐๐พ๐ ๐ ๐ฝ๐พ ๐ต๐๐ด ๐ฟ๐พ๐๐ธ๐ฑ๐ป๐ด ๐ด๐ฝ๐๐ธ๐ฐ๐๐ป๐พ, ๐๐ด๐ฟ๐พ๐๐๐ด๐ป๐พ ๐ฐ๐ป ๐ฟ๐๐พ๐ฟ๐ธ๐ด๐๐ฐ๐๐ธ๐พ ๐ณ๐ด๐ป ๐ฑ๐พ๐*', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|menรบ|memu|memรบ|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos|m|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
