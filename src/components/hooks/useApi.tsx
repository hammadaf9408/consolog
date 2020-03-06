import { useContext } from 'react'
import { LoadingContext } from 'context/loading/loadingContext';
import { ErrorContext } from 'context/error/errorContext';
import { AxiosResponse } from "axios";
import { ApiCall, Cookies } from "middleware";
import { LOCALNAME } from "utils/Constant";
import { IError } from "context/error/IError";


export const useApi = () => {
  const config = {
    NOAUTH: {
      headers: {
        'Content-Type': 'application/json',
      }
    },
    WITHAUTH: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get(LOCALNAME.TOKEN)}`
      }
    }
  }

  const loadingContext = useContext(LoadingContext);
  const errorContext = useContext(ErrorContext);

  const { setLoading, resetLoading } = loadingContext;
  const { setError } = errorContext;

  const handleError = (res: any) => {
    const err: IError = {
      status: res.status,
      statusText: res.statusText,
      message: res.data.error || 'Error'
    }
    setError(err);
  }

  const getOnApi = async (routes: string, next: any) => {
    setLoading();
    let res: AxiosResponse<any> = await ApiCall.get(routes, config.WITHAUTH); 
    if (res) {
      if (res.status === 200) {
        next(res);
      } else {
        handleError(res);
      }
      resetLoading();
    }
  }

  const postOnApi = async (routes: string, values: any, withAuth: boolean, next: any) => {
    setLoading();
    let res: AxiosResponse<any> = await ApiCall.post(routes, values, withAuth ? config.WITHAUTH : config.NOAUTH); 
    if (res) {
      if (res.status === 200) {
        next(res);
      } else {
        handleError(res);
      }
      resetLoading();
    }
  }

  const modifyOnApi = async (routes: string, id: string, values: any, next: any) => {
    setLoading();
    let res: AxiosResponse<any> = await ApiCall.put(routes, id, values, config.WITHAUTH); 
    if (res) {
      if (res.status === 200) {
        next(res);
      } else {
        handleError(res);
      }
      resetLoading();
    }
  }

  const deleteOnApi = async (routes: string, id: string, next: any) => {
    setLoading();
    let res: AxiosResponse<any> = await ApiCall.delete(routes, id, config.WITHAUTH);
    if (res) {
      if (res.status === 200) {
        next(res);
      } else {
        handleError(res);
      }
      resetLoading();
    }
  }

  return {
    getOnApi,
    postOnApi,
    modifyOnApi,
    deleteOnApi
  }
}
