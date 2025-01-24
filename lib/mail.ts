'use server'

import dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
import { z } from 'zod'

dotenv.config({ path: '.env.local' })

const _mailInfo = z.object({
  // 目标邮箱
  to: z.string().email(),
  // 标题
  subject: z.string(),
  // 文本
  text: z.string().optional(),
  // 富文本，如果文本和富文本同时设置，富文本生效。
  html: z.string().optional(),
})

export type IMailInfo = z.infer<typeof _mailInfo>

export const sendSignupEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +(process.env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  // 定义transport对象并发送邮件
  const info = await transporter.sendMail({
    from: `m_q-world <${process.env.MAIL_USER}>`,
    to: email,
    subject: '欢迎来到M_Q的世界',
    text: '先随便写点什么',
  })

  console.log(111, info)

  return info
}

export const sendEmail = async (mailInfo: IMailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +(process.env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  // 定义transport对象并发送邮件
  const info = await transporter.sendMail({
    from: `m_q-world <${process.env.MAIL_USER}>`,
    ...mailInfo,
  })

  return info
}
