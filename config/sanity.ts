import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: "66f67s2u", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2024-03-08",
});

export default sanityClient;
