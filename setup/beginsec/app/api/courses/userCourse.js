try {
    // พยายามดึงข้อมูลคอร์สจากฐานข้อมูลโดยตรง
    userCourses = await prisma.course.findMany({
      take: 4, // จำกัดที่ 4 คอร์ส
    }).catch(e => {
      console.error("Prisma query error:", e)
      return []
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    // กลับไปใช้อาร์เรย์คอร์สว่างเปล่าที่กำหนดไว้แล้ว
  }