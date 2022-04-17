import express from 'express'
import { drive_v3 } from 'googleapis'

declare global {
  namespace Express {
    interface Request {
      drive?: drive_v3.Drive
    }
  }
}
