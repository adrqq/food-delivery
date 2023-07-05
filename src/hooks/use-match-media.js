/* eslint-disable max-len */
import { useMediaQuery } from 'react-responsive';

export const Example = () => {
  const is900 = useMediaQuery({ query: '(max-width: 900px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 766px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 767px) and (max-width: 1023px)' });

  const isMobileMini = useMediaQuery({ query: '(max-width: 466px)' });
  const isMobileMax = useMediaQuery({ query: '(min-width: 467px) and (max-width: 766px)' });

  const smallHight = useMediaQuery({ query: '(max-height: 630px)' });
  const maxHight = useMediaQuery({ query: '(min-height: 750px)' });

  const is1350 = useMediaQuery({ query: '(max-width: 1350px)' });
  const is1120 = useMediaQuery({ query: '(max-width:1120px)' });
  const is918 = useMediaQuery({ query: '(max-width:918px)' });
  const is1024 = useMediaQuery({ query: '(max-width:1024px)' });
  const is373 = useMediaQuery({ query: '(max-width:373px)' });
  const is467 = useMediaQuery({ query: '(max-width:420px)' });
  const is576 = useMediaQuery({ query: '(max-width:576px)' });
  const onBigDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const onDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return {
    is373,
    is467,
    is576,
    is1024,
    is918,
    isMobileMini,
    isMobile,
    isTablet,
    isMobileMax,
    smallHight,
    maxHight,
    is900,
    is1350,
    is1120,
    onDesktop,
    onBigDesktop,
  };
};
