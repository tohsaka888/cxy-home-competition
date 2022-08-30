// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'
import { genMockData } from 'mock/genMockData'

/**
 * @openapi
 * /api/brief:
 *   get:
 *     description: 获取假数据
 *     responses:
 *       200:
 *         description: 返回列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                 list: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: axxss
 *                       name:
 *                         type: string
 *                         example: 比赛
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
    res.status(200).json({ success: true, list: genMockData() })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}
