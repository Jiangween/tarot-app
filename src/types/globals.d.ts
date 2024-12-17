import mongoose from 'mongoose'

declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}