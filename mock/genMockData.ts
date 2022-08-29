export const genMockData = () => {
  const competitions: API.Competition[] = []
  for (let i = 0; i < 10; i++) {
    const competition: API.Competition = {
      name: `测试竞赛${i + 1}`,
      createdTime: '2022-02-02 20:22:22',
      creator: {
        username: 'tohsaka888',
        email: '156132264@qq.com',
      },
      updatedTime: '2022-02-02 20:22:22',
      participants: new Array(100).fill({
        username: 'tohsaka888',
        email: '156132264@qq.com'
      }),
      awardSetting: [
        { award: '一等奖', limit: 1 },
        { award: '二等奖', limit: 3 },
        { award: '三等奖', limit: 5 },
        { award: '优秀奖', limit: 10 }
      ],
      winners: [
        ...new Array(1).fill({ award: '一等奖', username: 'tohsaka888', email: '156132264@qq.com' }),
        ...new Array(3).fill({ award: '二等奖', username: 'tohsaka888', email: '156132264@qq.com' }),
        ...new Array(5).fill({ award: '三等奖', username: 'tohsaka888', email: '156132264@qq.com' }),
        ...new Array(10).fill({ award: '优秀奖', username: 'tohsaka888', email: '156132264@qq.com' }),
      ],
      info: {
        place: '开阳楼A312',
        way: '线下比赛/个人赛',
        limit: 100,
        signUpStart: '2022-5-10 10:00:00',
        signUpEnd: '2022-5-20 10:00:00',
        time: '2022-5-21 10:00:00',
        duration: '2小时',
      },
      banners: new Array(5).fill({
        url: 'http://42.200.211.25:10010/fggqbz.120821/%E9%A3%8E%E6%99%AF%E9%AB%98%E6%B8%85%E5%A3%81%E7%BA%B8-009.jpg',
        intro: '这是一段图片介绍,这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍这是一段图片介绍'
      })
    }
    competitions.push(competition)
  }
  return competitions
}