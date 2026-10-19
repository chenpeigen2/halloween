export type Movie = {
  id: string
  titleZh: string
  titleEn: string
  year: number
  director: string
  tags: string[]
  synopsis: string
  trailerId: string
  motif: 'pumpkin' | 'keyhole' | 'lamp' | 'eye' | 'claw' | 'hand' | 'skull' | 'sticks'
  bg: string
  ink: string
}

/** 8 部万圣节必看恐怖片，预告片 ID 均来自真实 YouTube 链接 */
export const movies: Movie[] = [
  {
    id: 'halloween',
    titleZh: '月光光心慌慌',
    titleEn: 'Halloween',
    year: 1978,
    director: '约翰·卡朋特',
    tags: ['砍杀片', '迈克尔·麦尔斯'],
    synopsis:
      '十五年前，六岁的迈克尔·麦尔斯在万圣节夜杀害了自己的姐姐。十五年后，他从精神病院逃脱，戴着白色面具回到了故乡哈登菲尔德。今夜，他只是安静地跟着你——直到你不再是一个人。',
    trailerId: '3JsrH8eUVOo',
    motif: 'pumpkin',
    bg: '#160b04',
    ink: '#ff7a1a',
  },
  {
    id: 'shining',
    titleZh: '闪灵',
    titleEn: 'The Shining',
    year: 1980,
    director: '斯坦利·库布里克',
    tags: ['心理恐怖', '雪山旅馆'],
    synopsis:
      '作家杰克·托兰斯带着妻儿担任远望酒店的冬季看守人。大雪封路，与世隔绝。237 号房间里有什么在等着；而打字机上永远只有一句话：只工作不玩耍，杰克变傻瓜。',
    trailerId: 'S014oGZiSdI',
    motif: 'keyhole',
    bg: '#101418',
    ink: '#e23b3b',
  },
  {
    id: 'exorcist',
    titleZh: '驱魔人',
    titleEn: 'The Exorcist',
    year: 1973,
    director: '威廉·弗莱德金',
    tags: ['宗教恐怖', '经典'],
    synopsis:
      '十二岁的蕾甘开始出现无法解释的行为：身体扭曲、声音低沉、言语亵渎。医学无能为力，母亲只得求助于两位神父。当科学与迷信之间只剩黑暗，地狱就在那张床上。',
    trailerId: 'jyW5YXDcIGs',
    motif: 'lamp',
    bg: '#0a0a0c',
    ink: '#e8e2d5',
  },
  {
    id: 'psycho',
    titleZh: '惊魂记',
    titleEn: 'Psycho',
    year: 1960,
    director: '阿尔弗雷德·希区柯克',
    tags: ['悬疑', '诺曼·贝茨'],
    synopsis:
      '女秘书玛丽恩携款潜逃，途中投宿于公路边的贝茨旅馆。老板诺曼腼腆温和，爱与母亲的木偶说话。浴室里那场四十七秒的戏，永远改变了电影。',
    trailerId: 'DTJQfFQ40lI',
    motif: 'eye',
    bg: '#0d0d0f',
    ink: '#cfc9bd',
  },
  {
    id: 'elm-street',
    titleZh: '猛鬼街',
    titleEn: 'A Nightmare on Elm Street',
    year: 1984,
    director: '韦斯·克雷文',
    tags: ['砍杀片', '弗莱迪'],
    synopsis:
      '榆树街的孩子们做着同一个梦：一个戴礼帽、满脸烧伤、手套上长着剃刀的男人追杀他们。梦里受的伤会带到现实。所以——千万别睡着。',
    trailerId: 'dCVh4lBfW-c',
    motif: 'claw',
    bg: '#0c0713',
    ink: '#a855f7',
  },
  {
    id: 'living-dead',
    titleZh: '活死人之夜',
    titleEn: 'Night of the Living Dead',
    year: 1968,
    director: '乔治·罗梅罗',
    tags: ['丧尸片', '公有领域'],
    synopsis:
      '一伙陌生人被困在宾夕法尼亚乡下的农舍里，窗外是缓缓逼近的死人。收音机说：他们以活人为食。黑白影像，永夜将至，恐怖片从此有了模板。',
    trailerId: 'fPRPES5YtfM',
    motif: 'hand',
    bg: '#0b0b0b',
    ink: '#b9b4ab',
  },
  {
    id: 'evil-dead-ii',
    titleZh: '鬼玩人2',
    titleEn: 'Evil Dead II',
    year: 1987,
    director: '山姆·雷米',
    tags: ['恐怖喜剧', '血浆'],
    synopsis:
      '艾什又回到了那间林中小屋，又一次打开了那盘录音带。这次他学会了对镜狂笑，也学会了和自己被砍断的手搏斗。恐怖与癫狂在此短路，血浆管够。',
    trailerId: '7qBGnzz7mPI',
    motif: 'skull',
    bg: '#140608',
    ink: '#d92b3a',
  },
  {
    id: 'blair-witch',
    titleZh: '女巫布莱尔',
    titleEn: 'The Blair Witch Project',
    year: 1999,
    director: '丹尼尔·迈里克 / 艾德多·桑切斯',
    tags: ['伪纪录片', '致郁'],
    synopsis:
      '三名学生导演进入马里兰州的黑山森林，拍摄一部关于女巫布莱尔传说的纪录片。他们迷路了。一年后，他们的摄像机被找到——录像带里的最后画面，是一个人面对墙角站着。',
    trailerId: 'MBZ-POVsrlI',
    motif: 'sticks',
    bg: '#070c09',
    ink: '#7fc99b',
  },
]
