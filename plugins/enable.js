let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
const sections = [
{
title: `๐๐๐๐๐ ๐๐ ๐๐๐๐๐๐๐๐`,
rows: [
{title: "โจ | ๐๐ด๐ป๐ฒ๐พ๐ผ๐ด", rowId: `${usedPrefix + command} welcome`},
{title: "๐ | ๐ผ๐พ๐ณ๐พ ๐ฟ๐๐ฑ๐ป๐ธ๐ฒ๐พ", rowId: `${usedPrefix + command} public`},
{title: "๐ฅต | ๐ผ๐พ๐ณ๐พ ๐ท๐พ๐๐ฝ๐", rowId: `${usedPrefix + command} modohorny`},
{title: "๐ | ๐ฐ๐ฝ๐๐ธ๐ป๐ธ๐ฝ๐บ", rowId: `${usedPrefix + command} antilink`},
{title: "๐ | ๐ฐ๐ฝ๐๐ธ๐ป๐ธ๐ฝ๐บ ๐ธ", rowId: `${usedPrefix + command} antilink2`},
{title: "๐ซ | ๐ฐ๐ฝ๐๐ธ๐ณ๐ด๐ป๐ด๐๐ด", rowId: `${usedPrefix + command} antidelete`},
{title: "๐ | ๐ณ๐ด๐๐ด๐ฒ๐", rowId: `${usedPrefix + command} detect`},
{title: "โ | ๐๐ด๐๐๐๐ธ๐ฒ๐", rowId: `${usedPrefix + command} restrick`},
{title: "โ๏ธ | ๐ฐ๐๐๐พ๐๐ด๐ฐ๐ณ", rowId: `${usedPrefix + command} autoread`},
]}, ]
let name = await conn.getName(m.sender)
const listMessage = {
text: ' ',
footer: author,
title: `โญโโใ โฏโฏโฏโฏโฏโฏโฏโฏ ใโโฎ
โโกโกโกโกโกโกโกโกโกโกโกโกโกโก
โโค *โจ๐๐๐๐, ${name}!!*
โโกโกโกโกโกโกโกโกโกโกโกโกโกโก
โฐโโโกโฏโฏโฏโฏโฏโฏโฏโฏโโโโฏ
โโโโโโโโโโโโโโโ
โฃโง *๐๐ด๐ป๐ด๐ฒ๐ฒ๐ธ๐พ๐ฝ๐ฐ ๐๐ฝ๐ฐ ๐ณ๐ด ๐ป๐ฐ๐ ๐พ๐ฒ๐ฟ๐ธ๐พ๐ฝ๐ด๐ ๐๐๐ด ๐๐ฐ๐ป๐ด๐ฝ ๐ด๐ฝ ๐ป๐ฐ ๐๐ธ๐ถ๐๐ธ๐ด๐ฝ๐๐ด ๐ป๐ธ๐๐๐ฐ ๐พ ๐ณ๐ฐ ๐ฒ๐ป๐ธ๐ฒ๐บ ๐ด๐ฝ ๐ฐ๐ป๐ถ๐๐ฝ ๐ฑ๐พ๐๐พ๐ฝ ๐ณ๐ด ๐ด๐๐๐ด ๐ผ๐ด๐ฝ๐๐ฐ๐น๐ด*
โโกโกโกโกโกโกโกโกโกโกโกโกโกโก
โฃ เถฌโโน๏ธ _${usedPrefix}enable *welcome*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *welcome*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *public*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *public*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *modohorny*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *modohorny*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *antilink*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *antilink*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *antilink2*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *antilink2*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *detect*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *detect*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *restrict*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *restrict*_
โฃ เถฌโโน๏ธ _${usedPrefix}enable *autoread*_
โฃ เถฌโโน๏ธ _${usedPrefix}disable *autoread*_
โโโโโโโโโโโโโโโ
ใคใคใคใคใคใคใคใค
`,
buttonText: "๐๐๐๐๐๐๐๐๐๐ ๐๐๐๐ข",
sections }

let isEnable = /true|enable|(turn)?on|1/i.test(command)
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
case 'detect':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
case 'antidelete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = !isEnable
break
case 'public':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
case 'antilink':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
case 'antilink2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
case 'modohorny':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modohorny = isEnable          
break
case 'restrict':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
case 'autoread':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['autoread'] = isEnable
break
case 'pconly':
case 'privateonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
case 'gconly':
case 'grouponly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break
case 'swonly':
case 'statusonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
default:
if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage)
throw false
}
conn.sendButton(m.chat, `๐๏ธ ๐๐๐๐๐๐: ${type} 
๐๏ธ ๐๐๐๐๐๐: ${isEnable ? '๐ฐ๐ฒ๐๐ธ๐๐ฐ๐ณ๐พ' : '๐ณ๐ด๐๐ฐ๐ฒ๐๐ธ๐๐ฐ๐ณ๐พ'}
๐ฃ ๐๐๐๐: ${isAll ? '๐ด๐๐๐ด ๐ฑ๐พ๐' : isUser ? '' : '๐ด๐๐๐ด ๐ฒ๐ท๐ฐ๐'}`, author, null, [[`${isEnable ? 'โ๏ธ ๐ณ๐ด๐๐ฐ๐ฒ๐๐ธ๐๐ฐ๐ โ๏ธ' : 'โ๏ธ ๐ฐ๐ฒ๐๐ธ๐๐ฐ๐ โ๏ธ'}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], ['๐พ ๐ผ๐ด๐ฝ๐ ๐ฟ๐๐ธ๐ฝ๐ฒ๐ธ๐ฟ๐ฐ๐ป ๐พ', '.menu']],m)}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
export default handler
