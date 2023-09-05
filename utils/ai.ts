import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('the mood of the preson who wrote the journal entry'),
    summary: z.string().describe('quick summary of the entire entry'),

  })
)

export const analyse = async (prompt) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })


  const result = await model.call(prompt)
  console.log('>>> langchain result: ', result)
}