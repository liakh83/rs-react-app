import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@redux/store';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
