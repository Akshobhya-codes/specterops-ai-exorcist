// src/utils/netlifyClient.js
import { NetlifyAPI } from 'netlify'

export const netlify = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN)
