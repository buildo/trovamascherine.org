FROM node:12 as build
ARG REACT_APP_API_ENDPOINT
ARG REACT_APP_DATA_STUDIO_URL
ARG REACT_APP_MAPBOX_API_KEY

WORKDIR /srv/web


ADD package.json .
ADD yarn.lock .
ADD .env .

RUN yarn --no-progress --network-timeout 120000

ADD . .

RUN NODE_ENV=production yarn build

FROM nginx

COPY --from=build /srv/web/build /usr/share/nginx/html
COPY ./deploy/default.conf /etc/nginx/conf.d/default.conf
