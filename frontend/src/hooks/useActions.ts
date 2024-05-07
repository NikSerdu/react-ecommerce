import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { rootActions } from "../store/root-actions";
import { useAppDispatch } from "../store/store";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
