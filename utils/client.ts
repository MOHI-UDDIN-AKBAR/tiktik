import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "17axoe1t",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN_API, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
