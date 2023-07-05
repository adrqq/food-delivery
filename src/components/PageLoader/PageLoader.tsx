import { MutatingDots } from 'react-loader-spinner';
import s from './PageLoader.module.scss';

export const PageLoader = () => {
  return (
    <div className={s.page_loader}>
      <div className={s.page_loader__title__wrapper}>
        <h1 className={s.page_loader__title}>Дукат</h1>
      </div>
      <MutatingDots
        color="#ffc700"
        secondaryColor="#da510f"
        height={100}
        width={100}
      />
    </div>
  );
};
