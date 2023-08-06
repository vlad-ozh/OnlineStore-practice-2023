import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../model/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
