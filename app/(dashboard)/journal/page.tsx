import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyse } from '@/utils/ai'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  await analyse(`I'm going to give you a journal entry, I want you to analyze it for a few things. I need the mood,
  what the subject is, a summary, a color representing the mood, and a string indicating true if the mood is negative or false if positive. 
  You need to return the format in json like so:
  {"mood": '', "subject": '', "color": '', "negative": '', "summary": ''} 
  
  <journal-entry>
  Today was a really great day. I finally was able to grab a pair of shoes I have been dying to get.
  </journal-entry>
  `)

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 px-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
