import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), '')

  return {

  	plugins: [react()],
  	resolve: {
      	alias: {
        	  '@' : path.resolve(__dirname, './src'),
       		}
     	},
   	server: {
      		host: env.VITE_HOST === 'true' ? true : 'localhost',
      		port: parseInt(env.VITE_PORT) || 5173,
      		allowedHosts: env.VITE_ALLOWED_HOSTS?.split(',') || ['localhost']
    	}
   }
})
