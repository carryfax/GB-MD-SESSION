import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
if (!args || !args[0]) throw '*[βππππβ] πΈπ½ππ΄πππ΄ π΄π» π²πΎπΌπ°π½π³πΎ πΌπ°π π΄π» π΄π½π»π°π²π΄ / π»πΈπ½πΊ π³π΄ ππ½ ππΈπ³π΄πΎ π³π΄ ππΎππππ±π΄*'
let { thumbnail, video, title } = await youtubedl(args[0])
.catch(async () => await youtubedlv2(args[0]))
let link = await video['360p'].download()
const isY = /y(es)/gi.test(args[1])
const limitedSize = (isPrems || isOwner ? 99 : 70) * 1024
let isLimit = limitedSize < video['360p'].fileSize
if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*π₯ ππΈπππ»πΎ:* ${title}
*π πΏπ΄ππΎ π³π΄π» ππΈπ³π΄πΎ:* ${video['360p'].fileSizeH}
`.trim(), m)
await conn.sendFile(m.chat, link, title + '.mp3', `
*π₯ ππΈπππ»πΎ:* ${title}
*π πΏπ΄ππΎ π³π΄π» ππΈπ³π΄πΎ:* ${video['360p'].fileSizeH}
`.trim(), m, null, {
asDocument: 0
})}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
handler.exp = 0
export default handler
