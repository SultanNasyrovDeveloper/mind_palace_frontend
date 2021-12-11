FROM node

COPY /frontend /app
WORKDIR /app
EXPOSE 8000

RUN npm install -g npm
RUN npm install -g @vue/cli @vue/cli-service @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-pwa vue-template-compiler@^2.0.0 vue-cli-plugin-i18n ajv@^5.0.0 chart.js@2.7.x webpack

RUN npm install

ENTRYPOINT ['/bin/bash/', 'docker/docker_entrypoint.sh']