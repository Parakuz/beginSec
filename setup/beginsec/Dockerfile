# # ขั้นตอนที่ 1: Build app ด้วย Node 18
# FROM node:18-bullseye AS builder

# WORKDIR /app

# # คัดลอกไฟล์ทั้งหมดก่อน เพื่อให้ Prisma schema อยู่ใน container
# COPY . .

# # ติดตั้ง dependencies
# RUN npm install

# # ✅ Prisma generate ต้องรันหลังจากไฟล์ schema ถูก copy เข้ามา
# RUN npx prisma generate

# # ✅ สร้างแอป
# RUN npm run build

# # ขั้นตอนที่ 2: Run Production Server
# FROM node:18-bullseye

# WORKDIR /app

# # คัดลอกไฟล์จาก builder
# COPY --from=builder /app ./

# # ติดตั้งเฉพาะ production dependencies
# RUN npm install --omit=dev

# EXPOSE 3000

# CMD ["npm", "start"]


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

# เปิดพอร์ต 3000 สำหรับ Next.js
EXPOSE 3000

# รันแอปในโหมด development
CMD ["npm", "run", "dev"]