import axios from "axios";
import { Image, FetchArticlesResponse } from "../types";

export const fetchArticles = async (
  search: string,
  currentPage: number
): Promise<Image[] | undefined> => {
  try {
    const result = await axios.get<FetchArticlesResponse>(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          client_id: "atZzbzuCiyXEn51AepXZzNVocLjc989iBNDnHuKbzFg",
          page: currentPage,
          query: search,
          orientation: "landscape",
        },
      }
    );
    return result.data.results;
  } catch (error) {
    console.error("We can't get data from server");
  }
};
export default fetchArticles;
