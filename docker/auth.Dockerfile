FROM node:16-alpine as development

WORKDIR /usr/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build


FROM node:16-alpine as production

ARG node_env=production
ENV NODE_ENV=${node_env}

WORKDIR /usr/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --frozen-lockfile

COPY --from=development /usr/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]
