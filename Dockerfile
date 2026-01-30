# Resmi Node 20 (Debian tabanlı - en stabil olanı) kullanıyoruz
FROM node:20

# Çalışma klasörünü oluştur
WORKDIR /opt/app

# ÖNCE sadece paket dosyalarını kopyala (Cache mantığı için önemli)
COPY package.json package-lock.json ./

# Node modüllerini sıfırdan, Linux uyumlu ve peer dependency hatalarını yok sayarak kur
# Sharp modülünü özellikle Linux x64 mimarisine göre rebuild et
RUN npm config set fetch-retry-maxtimeout 600000 -g && \
    npm install --legacy-peer-deps && \
    npm rebuild sharp

# ŞİMDİ kalan proje dosyalarını kopyala (node_modules hariç - .dockerignore sayesinde)
COPY . .

# Environment değişkenini ayarla ve Build al
ENV NODE_ENV=production
RUN npm run build

# Portu aç
EXPOSE 1337

# Başlat
CMD ["npm", "run", "start"]