import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../../hooks';
import { getProducts, setPage } from '../../../store/reducers/productsSlice';
import { Chevron } from '../../shared';
import styles from './Slider.module.scss';

interface Props {
  itemWidthInPx: number;
}

export const Slider: React.FC<Props> = ({ itemWidthInPx, children }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const { page, fetching } = useSelector(s => s.products);
  const [offset, setOffset] = useState(0);
  const [slideDisabled, setSlideDisabled] = useState({
    left: true,
    right: false,
  });

  const onSlide = (direction: 'left' | 'right') => () => {
    if (ref.current) {
      const { clientWidth, scrollWidth } = ref.current;
      const width = Math.floor(clientWidth);
      const slideSize = itemWidthInPx * Math.floor(width / itemWidthInPx);
      const willOutOfBounds = offset + slideSize + width >= scrollWidth;

      if (willOutOfBounds && !fetching) {
        dispatch(setPage(page + 1));
        dispatch(getProducts());
      }

      if (direction === 'left') {
        setOffset(offset => offset - slideSize);
        setSlideDisabled(values => ({
          ...values,
          left: offset - slideSize <= 0,
        }));
      } else {
        setOffset(offset => offset + slideSize);
        setSlideDisabled(values => ({
          ...values,
          left: false,
        }));
      }
    }
  };

  useEffect(() => {
    setSlideDisabled(values => ({
      ...values,
      right: fetching,
    }));
  }, [fetching]);

  return (
    <div className={styles.slider}>
      <Chevron
        direction='left'
        disabled={slideDisabled.left}
        onClick={onSlide('left')}
      />
      <div
        className={styles.inner}
        style={{ transform: `translateX(-${offset}px)` }}
        ref={ref}
      >
        {children}
      </div>
      <Chevron
        direction='right'
        disabled={slideDisabled.right}
        onClick={onSlide('right')}
      />
    </div>
  );
};
