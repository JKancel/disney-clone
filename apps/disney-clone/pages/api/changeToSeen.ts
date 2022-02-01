import { gql, GraphQLClient } from 'graphql-request';

const changeToSeen = async ({ body }, res) => {
  const graphQLClient = new GraphQLClient(process.env.ENDPOINT, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN
    }
  });

  await graphQLClient.request(
    gql`
      mutation ($slug: String!) {
        __typename
        updateVideo(where: { slug: $slug }, data: { seen: true }) {
          id
          seen
          title
        }
      }
    `,
    { slug: body.slug }
  );

  await graphQLClient.request(
    gql`
      mutation publishVideo($slug: String) {
        __typename
        publishVideo(where: { slug: $slug }, to: PUBLISHED) {
          slug
        }
      }
    `,
    { slug: body.slug }
  );

  res.status(201).json({ slug: body.slug });
  return res;
};

export default changeToSeen;
