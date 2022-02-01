import React from 'react';
import { render } from '@testing-library/react';

import Home from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const videos = [
      {
        id: 'ckucypz54i19a0c60b88q2tjn',
        seen: true,
        title: 'Jaws',
        tags: ['classic', 'thriller', 'horror', 'animals', 'drama'],
        description: 'A film about a shark. This is a Classic film that is pretty scary at times and just great in other times.',
        slug: 'jaws',
        thumbnail: { url: 'https://media.graphcms.com/3c60N5CST96zdrQYmjTk' },
        mp4: { url: 'https://media.graphcms.com/FrGJzKKeRqGQxNN8eASR' }
      },
      {
        id: 'ckucyx3bci4800c03dzthhz2w',
        seen: true,
        title: 'Mulan',
        tags: ['classic', 'family', 'drama', 'disney'],
        description: 'A Disney Classic in which a girl goes to fight for China.',
        slug: 'mulan',
        thumbnail: { url: 'https://media.graphcms.com/0PPwKOvmReeSIpRefgaw' },
        mp4: { url: 'https://media.graphcms.com/Qln1C7ZRoOFPW1DB02OA' }
      }
    ];
    const account = {
      username: 'jok',
      avatar: { url: 'https://media.graphcms.com/ikCKygzCT12bSBrBofSm' }
    };
    const { baseElement } = render(<Home videos={videos} account={account} />);
    expect(baseElement).toBeTruthy();
  });
});
