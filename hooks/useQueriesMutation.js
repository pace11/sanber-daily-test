/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Axios from "axios";
import Cookies from "js-cookie";

/**
 *
 * @param {Boolean} param.enabled
 * @param {String} param.prefixUrl
 * @param {Boolean} param.isShowPopupSuccess
 * @param {Function} callback
 */
export const useQueriesMutation = ({ enabled = true, prefixUrl = "", isShowPopupSuccess = false } = {}) => {
  const toast = useToast();
  const [data, setData] = useState({
    data: [],
    isLoading: false,
  });
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  /**
   *
   * @param {String} param.description
   * @param {String} param.title
   */
  const popupSuccess = ({ description = "", title = "" } = {}) =>
    toast({
      title,
      description,
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
      variant: "top-accent",
    });

  /**
   *
   * @param {String} param.description
   * @param {String} param.title
   */
  const popupError = ({ description = "", title = "" } = {}) =>
    toast({
      title,
      description,
      status: "error",
      duration: 1000,
      isClosable: true,
      position: "top",
      variant: "top-accent",
    });

  /**
   *
   * @param {String} param.url
   */
  const fetchingData = useCallback(async ({ prefixUrl = "" } = {}) => {
    setData({ ...data, isLoading: true });
    try {
      const response = await Axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL_API}${prefixUrl}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("sb_token")}`,
        },
      });
      if (isShowPopupSuccess) {
        popupSuccess({
          title: response?.statusText,
          description: response?.data?.message,
        });
      }
      setData({
        ...data,
        data: response?.data,
        isLoading: false,
      });
    } catch (error) {
      setData({ ...data, isLoading: false });
      popupError({
        description: error?.response?.data?.message,
        title: "Error",
      });
    }
  }, []);

  /**
   *
   * @param {String} param.url
   * @param {String} param.method
   * @param {Object} param.payload
   */
  const useMutate = useCallback(
    async ({ prefixUrl = "", method = "POST", payload = {} } = {}) => {
      setLoadingSubmit(true);
      try {
        const response = await Axios({
          method,
          url: `${process.env.NEXT_PUBLIC_BASE_URL_API}${prefixUrl}`,
          data: payload,
          headers: {
            Authorization: `Bearer ${Cookies.get("sb_token")}`,
          },
        });
        setLoadingSubmit(false);
        popupSuccess({
          title: response?.statusText,
          description: response?.data?.message,
        });
        return { ...response?.data };
      } catch (error) {
        setLoadingSubmit(false);
        popupError({
          description: error?.response?.data?.message,
          title: "Error",
        });
      }
    },
    []
  );

  useEffect(() => {
    if (enabled && !!prefixUrl) {
      fetchingData({ prefixUrl });
    }
  }, [enabled, prefixUrl]);

  return { ...data, fetchingData, isLoadingSubmit, useMutate };
};
