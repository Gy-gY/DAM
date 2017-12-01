#!/bin/bash
# 这个脚本是jenkins做集成部署的时候用的,
# 开发过程中大家用不到
# pm2 start start.sh -x --interpreter bash --name dam-app
HOST=local.dam.vcg.com PORT=8088 npm start
