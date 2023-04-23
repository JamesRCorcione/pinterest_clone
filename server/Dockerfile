FROM node:19-slim

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY ./ ./

ENV ATLAS_URI=mongodb+srv://jamescorcione95:123@cluster0.dqtfbaz.mongodb.net/?retryWrites=true&w=majority
ENV PORT=8080
ENV SECRET='72b75dee48278c05eeb945dsdilvmuio3h489op73h4hn7s78odfghsv78d6899d83d5'
ENV CLOUDINARY_CLOUD_NAME=dspevi97j
ENV CLOUDINARY_API_KEY=233193854991389
ENV CLOUDINARY_API_SECRET=zZDETCzZ3sFb8-_-lXc-eyZxSII

EXPOSE 8080

CMD ["yarn", "start"]