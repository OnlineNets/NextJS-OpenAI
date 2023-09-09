import { prisma } from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore)
  const average = Math.round(sum / analyses.length)

  return { analyses, average }
}

const History = async () => {
  const { avg, analyses } = await getData()
  console.log('>>> analyses', analyses)
  return <div>history</div>
}

export default History
