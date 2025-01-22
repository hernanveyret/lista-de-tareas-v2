import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins:[
    react(),
    VitePWA({
      registerType:'autoUpdate',
      manifest:{
        name:'Lista de tareas',
        short_name:'Lista de tareas',
        description:'Sistema para generar listas de tareas',
        theme_color:'#FFFFFF',
        background_color:'#FFFFFF',
        display:'standalone',
        icons:[
          {
            src:'/icons/icon-192x192.png',
            sizes:'192x192',
            type:'image/png'
          },
          {
            src:'/icons/icon-512x512.png',
            sizes:'512x512',
            type:'image/png'
          }
        ]
      }
    })
  ]
})


