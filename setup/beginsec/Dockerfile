# เปลี่ยนจาก Alpine เป็น Debian (Bullseye) ที่รองรับ OpenSSL 1.1
FROM node:18-bullseye

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยัง container
COPY package.json package-lock.json* ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# ✅ Build Prisma client และ seed ข้อมูล (จะสร้าง dev.db)
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed

# ✅ ย้ายไฟล์ dev.db ไปตำแหน่งที่แอปจะใช้
RUN cp prisma/dev.db ./dev.db

# เปิดพอร์ต 3000 สำหรับ Next.js
EXPOSE 3000

# รันแอปในโหมด development
CMD ["npm", "run", "dev"]