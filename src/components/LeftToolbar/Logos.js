import mainEvent from '../../images/logos/main-event.png';
import sakseide from '../../images/logos/sakseide.png';
import aa from '../../images/logos/aa.png';

import logoOne from '../../images/logos/first-logo.jpg';
import logoOneSampleOne from '../../images/logos/sample-1-1.png';
import logoOneSampleTwo from '../../images/logos/sample-1-2.jpg';
import logoOneSampleThree from '../../images/logos/sample-1-3.jpg';

import logoTwo from '../../images/logos/second-logo.jpg';
import logoTwoSampleOne from '../../images/logos/sample-2-1.jpg';
import logoTwoSampleTwo from '../../images/logos/sample-2-2.jpg';
import logoTwoSampleThree from '../../images/logos/sample-2-3.jpg';

import logoThree from '../../images/logos/third-logo.jpg';
import logoThreeSampleOne from '../../images/logos/sample-3-1.jpg';
import logoThreeSampleTwo from '../../images/logos/sample-3-2.jpg';
import logoThreeSampleThree from '../../images/logos/sample-3-3.jpg';

// TODO: change file folder

const logos = [
    {
        name: 'Main Event',
        logoSrc: logoOne,
        description: 'We’re a mobile-first video production studio based in Sydney',
        logoCreatedAt: 2016,
        rightTopSectionBg: 'black',
        rightTopSectionFontColor: 'white',
        samplesProject: [
            { sampleSrc: logoOneSampleOne },
            { sampleSrc: logoOneSampleTwo },
            { sampleSrc: logoOneSampleThree },
        ],
    },
    {
        name: 'Sakseide',
        logoSrc: logoTwo,
        description: 'We’re a mobile-first video production studio based in Sydney',
        logoCreatedAt: 2015,
        rightTopSectionBg: 'black',
        rightTopSectionFontColor: 'white',
        samplesProject: [
            { sampleSrc: logoTwoSampleOne },
            { sampleSrc: logoTwoSampleTwo },
            { sampleSrc: logoTwoSampleThree },
        ],
    },
    {
        name: 'Some new Logo',
        logoSrc: logoThree,
        description: 'We’re a mobile-first video production studio based in Sydney',
        logoCreatedAt: 2015,
        rightTopSectionBg: 'black',
        rightTopSectionFontColor: 'white',
        samplesProject: [
            { sampleSrc: logoThreeSampleOne },
            { sampleSrc: logoThreeSampleTwo },
            { sampleSrc: logoThreeSampleThree },
        ],
    },
];

export default logos;
