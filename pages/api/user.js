import sanityClient from '@sanity/client'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}

const client = sanityClient(config)

export default withApiAuthRequired(async function formInputs (req, res) {

  const { email, slug, phone, name, userId } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'user',
      name,
      phone,
      email,
      slug,
      userId
    })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Error', err })
  }
  return res.status(200).json({ message: 'Submit' })
})
