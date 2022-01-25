import { stringify } from 'querystring';
import Card from './Card';

export type SectionProps = React.HTMLAttributes<any> & {
    genre: string,
    videos: { id: string, href: string, slug: string, thumbnail: string }[]
};

const Section = ({genre, videos}: SectionProps) => {
    console.log(videos);
    return (
        <div className={"section"}>
            <h3>{genre}</h3>
            <div>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail}></Card>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Section;