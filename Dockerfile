FROM node:12.16-alpine AS builder

ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_GOOGLE_API_KEY

WORKDIR /usr/src/app

COPY as-mini-frontend/package*.json ./

RUN npm install

COPY as-mini-frontend .

RUN npm run build

FROM cristianpaveldev/as-mini-backend:1.0.0

COPY --from=builder /usr/src/app/build /usr/src/app/public

EXPOSE 3010

CMD ["npm", "start"]
