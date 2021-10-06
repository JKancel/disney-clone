import { gql, GraphQLClient } from 'graphql-request';
import NavBar from '../components/NavBar';
import Section from '../components/Section';
import Link from 'next/link';
import Image from 'next/image';
import disneyLogo from '../public/disney-button.png';
import pixarLogo from '../public/pixar-button.png';
import marvelLogo from '../public/marvel-button.png';
import natGeoLogo from '../public/nat-geo-button.png';
import starWarsLogo from '../public/star-wars-button.png';

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  });
  const videoQuery = gql`
  query {
    videos {
      id
      seen
      title
      tags
      description
      slug
      thumbnail {
        url
      }
      mp4 {
        url
      }
    }
  }
  `;

  const accountQuery = gql`
  query {
    account(where: {id: "ckucysrg8hx740e09u51ojqj2"}) {
      username
      avatar {
        url
      }
    }
  }
  `;

  const videosData = await graphQLClient.request(videoQuery)
  const videos = videosData.videos;
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account;
  return {
    props: {
      videos,
      account
    }
  }
};


const Home = ({ videos, account }) => {
  console.log(videos);
  const randomVideo = (videos) => videos[Math.floor(Math.random() * videos.length)];
  const filterVideos = (videos, genre) => videos.filter((video) => video.tags.includes(genre));
  const unSeenVideos = (videos) => videos.filter(video => !video.seen);

  return (
    <>
      <NavBar account={account}></NavBar>
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />
        </div>
      </div>
      <div className="video-feed">
        <Link href="#disney"><div className="franchise" id="disney">
          <Image className="franchise-logo" src={disneyLogo} alt={"Disney Logo"}></Image>
        </div>
        </Link>
        <Link href="#pixar"><div className="franchise" id="pixar">
          <Image className="franchise-logo" src={pixarLogo} alt={"Pixar Logo"}></Image></div></Link>
        <Link href="#star-wars"><div className="franchise" id="star-wars">
          <Image className="franchise-logo" src={starWarsLogo} alt={"Star Wars Logo"}></Image></div></Link>
        <Link href="#nat-geo"><div className="franchise" id="nat-geo">
          <Image className="franchise-logo" src={natGeoLogo} alt={"Nat Geo Logo"}></Image></div></Link>
        <Link href="#marvel"><div className="franchise" id="marvel">
          <Image className="franchise-logo" src={marvelLogo} alt={"Marvel Logo"}></Image></div></Link>
      </div>
      <Section genre={'Recommanded for you'} videos={unSeenVideos(videos)} />
      <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
      <Section id="star-wars" genre={'Start Wars'} videos={filterVideos(videos, 'star-wars')} />
      <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
      <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'pixar')} />
      <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'disney')} />
      <Section id="nat-geo" genre={'National Geographic'} videos={filterVideos(videos, 'national-geographic')} />
      <Section id="marvel" genre={'Marvels'} videos={filterVideos(videos, 'marvels')} />

    </>
  )
}

export default Home;
