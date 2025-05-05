FROM node:23-alpine AS builder
WORKDIR /app

# 1. Copy และติดตั้ง dependencies ก่อน
COPY package*.json ./
RUN npm install

# 2. คัดลอก prisma ทั้งโฟลเดอร์ (และให้มันมีอยู่ก่อนจะ generate)
COPY prisma ./prisma
RUN npx prisma generate

# 3. คัดลอกโค้ดทั้งหมด
COPY . .

# 4. สร้างแอป Next.js
RUN npm run build

# 5. Runner image ที่เบากว่า
FROM node:23-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
