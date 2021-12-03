FROM public.ecr.aws/bitnami/node:12

WORKDIR /app

COPY . .

CMD [ "node", "server.js" ]