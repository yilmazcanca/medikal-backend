# Node 20 sürümünü baz al (LTS)
FROM node:20

# Çalışma klasörünü ayarla
WORKDIR /app

# Paket dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle (Legacy peer deps sorunu için flag ekledik)
RUN npm install --legacy-peer-deps

# Tüm proje dosyalarını kopyala
COPY . .

# Strapi build işlemini başlat
ENV NODE_ENV=production
RUN npm run build

# Portu dışarıya aç
EXPOSE 1337

# Uygulamayı başlat
CMD ["npm", "run", "start"]