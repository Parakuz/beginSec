# ขั้นตอนที่ 1: Build app ด้วย Node 18
FROM node:18-bullseye AS builder

WORKDIR /app

# คัดลอกไฟล์ทั้งหมดก่อน เพื่อให้ Prisma schema อยู่ใน container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# ✅ Prisma generate ต้องรันหลังจากไฟล์ schema ถูก copy เข้ามา
RUN npx prisma generate

# ✅ สร้างแอป
RUN npm run build

# ขั้นตอนที่ 2: Run Production Server
FROM node:18-bullseye

WORKDIR /app

# คัดลอกไฟล์จาก builder
COPY --from=builder /app ./

# ติดตั้งเฉพาะ production dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
