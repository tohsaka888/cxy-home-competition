// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from 'utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * paths:
 *   /api/competition/signup/{id}:
 *     post:
 *       description: 报名比赛
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           example: 630d8535e1cae4a4e1d28fc2
 *           schema:
 *              type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: 用户名
 *               required:
 *                 - username
 *               example:
 *                 username: tohsaka888
 *       responses:
 *         200:
 *           description: 返回报名状态
 *               
 */

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD',],
  origin: '*',
  preflightContinue: true
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    const query = req.query
    const { username } = req.body
    if (db) {
      const users = db.collection('users')
      const user = await users.findOne({ username })
      if (user) {
        delete user.password
        const competitionCollection = db.collection('competition')
        const competition = await competitionCollection.updateOne({ _id: new ObjectId(query.id as string) }, { $addToSet: { "participants": user } })
        res.status(200).json({ success: true, isSignUp: competition.acknowledged ? true : false })
      } else {
        res.status(200).json({ success: false, error: '用户不存在' })
      }
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}
