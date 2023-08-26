import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client=sanityClient({
    projectId:'m8qt2teu',
    dataset:'production',
    apiVersion:'2021-11-16',
    useCdn:true,
    token:'skcM3uQD0sEGMOUjZkfQ405zFMp2yMldRH64zxqnvIl24crVjnxKrTLbZ3en9OpnnRzD0fnYOEW3KGezzMn19yBeliJs3EcUMptZNIy3waDtD4HGdyqn8l7yQtGAsDQPiYZAg3qg4twR2PEneSJ7azLV36xYZB7IEBsY3mj5RZwqgLUbcovj',
})

const builder=imageUrlBuilder(client)
export const urlFor=(source)=>builder.image(source)