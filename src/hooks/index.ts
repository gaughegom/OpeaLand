//export { default as useWeb3Provider } from "./web3Provider";
//export { default as useDetectAccountChange } from "./detectAccountChange";

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';

//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;