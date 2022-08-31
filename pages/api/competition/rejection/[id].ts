// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from 'utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * paths:
 *   /api/competition/rejection/{id}:
 *     post:
 *       description: 取消报名
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
      const competitionCollection = db.collection('competition')
      const competition = await competitionCollection.updateOne({ _id: new ObjectId(query.id as string) }, { $pull: { participants: { username } } })
      res.status(200).json({ success: true, isReject: competition.matchedCount ? true : false })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}
