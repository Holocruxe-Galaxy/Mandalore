FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install && npm run build
COPY . .
RUN npm install
ENV DB_HOST=test-core-api.cirkyideh48r.us-east-1.rds.amazonaws.com
ENV DB_PORT=3306
ENV DB_USER=holocruxe
ENV DB_PASSWORD=xeFBN5NKsxEEC6EQUpvq
ENV DB_NAME=testCoreApi
ENV AUTHMICRO_SERVICE=https://auth.holocruxe.com
ENV DATABASE=mongodb+srv://alexandercanete035:xw26IRPdCOvVR608@mandaloredb.hw53voo.mongodb.net/
ENV FRONT_URL=*
ENV PORT=8080
ENV ACCESS_KEY_ID_AWS=AKIAQ6GID5GSQCFV6KFW
ENV SECRET_KEY_AWS=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
ENV BUCKET_REGION=us-east-1
ENV S3_BUCKET_NAME=holocruxe-images
EXPOSE 8080
CMD ["npm","run","start"]
