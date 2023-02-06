FROM node:lts-gallium

ENV CI=true

WORKDIR ./hinge_health_be
COPY ./hinge_health_be/package.json ./hinge_health_be

COPY ./hinge_health_be ./
COPY ./hinge_health_be/.env ./.env

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
